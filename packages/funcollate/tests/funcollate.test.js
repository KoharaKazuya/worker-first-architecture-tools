const { diff, patch } = require("../dist/funcollate.js");
const { expect } = require("chai");

const localPrev = {
  name: "parent",
  child: { name: "child" },
  count: 0
};
const localNext = {
  ...localPrev,
  count: 1
};
const remotePrev = {
  name: "parent",
  child: { name: "child" },
  count: 0
};

describe("diff", () => {
  it("returns JSON serializable value", () => {
    const d1 = diff(localPrev, localNext);
    const d2 = JSON.parse(JSON.stringify(d1));
    expect(d1).to.deep.equal(d2);
  });
});

describe("patch", () => {
  const d = diff(localPrev, localNext);

  it("patches difference", () => {
    const remoteNext = patch(remotePrev, d);
    expect(remoteNext).to.not.equal(remotePrev);
    expect(remoteNext.name).to.equal(remotePrev.name);
    expect(remoteNext.child).to.equal(remotePrev.child);
    expect(remoteNext.count).to.equal(1);
    expect(remotePrev.count).to.equal(0);
  });
});
