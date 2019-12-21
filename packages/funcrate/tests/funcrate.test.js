import { createCrate } from "/base/dist/funcrate.mjs";

describe("createCrate", () => {
  let crate;
  beforeEach(() => {
    crate = createCrate();
  });

  it("provides an object instantly", () => {
    const obj = crate.get();
    expect(Boolean(obj)).to.be.true;
  });

  it("is provided deferred value", async () => {
    let resolved = false;
    const obj = crate.get();
    obj.hello().then(() => {
      resolved = true;
    });
    await new Promise(r => setTimeout(r, 100));
    expect(resolved).to.be.false;
    crate.register({ async hello() {} });
    await new Promise(r => setTimeout(r, 100));
    expect(resolved).to.be.true;
  });

  it("provides deferred error", done => {
    const obj = crate.get();
    obj.hello().catch(() => {
      done();
    });
    crate.register({});
  });
});
