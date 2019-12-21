import { expose, wrap } from "/base/dist/funcable.mjs";

describe("Funcable over Worker", () => {
  let worker;
  beforeEach(() => {
    worker = new Worker("/base/tests/fixtures/worker.js");
  });
  afterEach(() => {
    worker.terminate();
  });

  it("invokes async function", async () => {
    const target = wrap(worker);
    const ret = await target.add(1, 2);
    expect(ret).to.equal(3);
  });

  it("communicates both request and response", done => {
    expose(
      {
        async pong() {
          done();
        }
      },
      worker
    );
    const target = wrap(worker);
    target.ping();
  });
});
