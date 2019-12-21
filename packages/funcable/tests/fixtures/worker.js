importScripts("/base/dist/funcable.umd.js");

const target = Funcable.wrap(self);

Funcable.expose({
  async add(a, b) {
    return a + b;
  },
  async ping() {
    await target.pong();
  }
});
