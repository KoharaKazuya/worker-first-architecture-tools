import { expose, wrap } from "/base/dist/funcable.mjs";

describe("Funcable over MessageChannel", () => {
  let channel;
  beforeEach(() => {
    channel = new MessageChannel();
  });

  it("invokes async function", done => {
    const funcs = {
      async call() {
        done();
      }
    };
    expose(funcs, channel.port1);
    channel.port1.start();

    const target = wrap(channel.port2);
    target.call();
  });
});
