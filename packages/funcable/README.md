# Funcable

[![version-widget]][npm]
[![build-widget]][build]
[![bundle-size-widget]][bundlephobia]

A library provides async function invocation based on Web Messaging.

```javascript
// main.js
const worker = new Worker("./worker.js");
const asyncFunctions = Funcable.wrap(worker);

asyncFunctions.add(1, 2).then(console.log); // → 3

// worker.js
const asyncFunctions = {
  async add(a + b) {
    const response = await fetch(`https://example.com/add?a=${a}&b=${b}`).json();
    return response.result;
  }
};
Funcable.expose(asyncFunctions);
```

## API

### `Funcable.expose(value: T, endpoint: Endpoint = self)`

- @param `value`: value to expose via endpoint
- @param `endpoint`: [MessagePort](https://developer.mozilla.org/docs/Web/API/MessagePort)-like object

Exposes `value` to be used by something beyond `endpoint`.

### `Funcable.wrap(endpoint: Endpoint): T`

- @param `endpoint`: [MessagePort](https://developer.mozilla.org/docs/Web/API/MessagePort)-like object
- @return: proxy object that can be considered as _exposed_ value.

Gets proxy object that can be considered as value exposed beyond `endpoint`.

## Similar

- [**Comlink**](https://github.com/GoogleChromeLabs/comlink) - Comlink makes WebWorkers enjoyable

[version-widget]: https://img.shields.io/npm/v/funcable
[build-widget]: https://img.shields.io/github/workflow/status/KoharaKazuya/worker-first-architecture-tools/Build
[bundle-size-widget]: https://img.shields.io/bundlephobia/minzip/funcable?label=minified%20size
[npm]: https://www.npmjs.com/package/funcable
[build]: https://github.com/KoharaKazuya/worker-first-architecture-tools/actions?query=workflow%3ABuild
[bundlephobia]: https://bundlephobia.com/result?p=funcable
