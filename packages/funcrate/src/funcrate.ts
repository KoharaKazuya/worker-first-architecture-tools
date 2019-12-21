import { AsyncFunctions } from "./protocol";

export function createCrate<T extends AsyncFunctions>() {
  let registered: T | null = null;
  const waitings: (() => void)[] = [];

  const proxy = createGetOnlyProxy({
    get(_target, prop) {
      // workaround for thenable object is automatically unwrapped by promise
      if (prop === "then") return;

      if (typeof prop !== "string")
        throw new Error("deletion invocation supports only string key");

      return (...args: unknown[]) =>
        (registered
          ? Promise.resolve(registered)
          : new Promise<T>(resolve => {
              waitings.push(() => {
                resolve(registered!);
              });
            })
        ).then(inner => inner[prop](...args));
    }
  });

  return {
    get(): Readonly<T> {
      return proxy;
    },
    register(t: T) {
      if (registered) throw new Error("Funcrate cannot be registered twice");
      if (!t)
        throw new Error(
          "Funcrate can be registered an object of async functions"
        );

      registered = t;
      waitings.forEach(w => w());
      waitings.length = 0;
    }
  };
}

function createGetOnlyProxy({
  get
}: {
  get: (target: any, prop: keyof any) => any;
}) {
  const unsupported = (feature: string) => () => {
    throw new Error(`Funcrate does not supports ${feature} proxy`);
  };

  return new Proxy({} as any, {
    getPrototypeOf: unsupported("getPrototypeOf"),
    setPrototypeOf: unsupported("setPrototypeOf"),
    isExtensible: unsupported("isExtensible"),
    preventExtensions: unsupported("preventExtensions"),
    getOwnPropertyDescriptor: unsupported("getOwnPropertyDescriptor"),
    defineProperty: unsupported("defineProperty"),
    has: unsupported("has"),
    get,
    set: unsupported("set"),
    deleteProperty: unsupported("deleteProperty"),
    ownKeys: unsupported("ownKeys"),
    apply: unsupported("apply"),
    construct: unsupported("construct")
  });
}
