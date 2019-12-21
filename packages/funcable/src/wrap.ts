import { createInvocationRequest, isInvocationResponse } from "./message";
import { AsyncFunctions, Endpoint } from "./protocol";

export default function wrap<T extends AsyncFunctions>(endpoint: Endpoint): T {
  return createGetOnlyProxy({
    get(_target, prop) {
      // workaround for thenable object is automatically unwrapped by promise
      if (prop === "then") return;

      if (typeof prop !== "string")
        throw new Error(
          `funcable funcation name of must be string, but found ${typeof prop}`
        );

      return (...args: unknown[]) =>
        new Promise((resolve, reject) => {
          const request = createInvocationRequest(prop, args);

          endpoint.addEventListener("message", function listener({ data }) {
            if (!isInvocationResponse(data)) return;
            if (data.id !== request.id) return;
            endpoint.removeEventListener("message", listener);

            if (data.success) {
              resolve(data.result);
            } else {
              reject(data.result);
            }
          });

          endpoint.postMessage(request);
        });
    }
  });
}

function createGetOnlyProxy({
  get
}: {
  get: (target: any, prop: keyof any) => any;
}) {
  const unsupported = (feature: string) => () => {
    throw new Error(`Funcable does not supports ${feature} proxy`);
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
