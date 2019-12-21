# Funcrate

[![version-widget]][npm]
[![build-widget]][build]
[![bundle-size-widget]][bundlephobia]

A library provides container for resolving async functions later.

```javascript
import { createCrate } from "funcrate";

const crate = createCrate();

// async function in crate can be invoked immediately
crate.add(1, 2).then(console.log); // → 3 (shown after crate registered)

// entity in crate can registered later
const asyncFunctions = {
  async add(a, b) {
    await new Promise(r => setTimeout(r, 100));
    return a + b;
  }
};
crate.register(asyncFunctions);
```

## API

### `createCrate(): Crate`

- @return: an empty `Crate`

Creates a crate. While it already has async, those are not resolved until entity registered.

### `Crate.get(): T`

- @return: proxy value that can be considered as registered value

Gets proxy value that can be considered as registered value.

### `Crate.register(value: T)`

- @param `value`: entity in crate

Registers entity in crate. Entity must be an object that has only functions return any type Promise.

[version-widget]: https://img.shields.io/npm/v/funcrate
[build-widget]: https://img.shields.io/github/workflow/status/KoharaKazuya/worker-first-architecture-tools/Build
[bundle-size-widget]: https://img.shields.io/bundlephobia/minzip/funcrate?label=minified%20size
[npm]: https://www.npmjs.com/package/funcrate
[build]: https://github.com/KoharaKazuya/worker-first-architecture-tools/actions?query=workflow%3ABuild
[bundlephobia]: https://bundlephobia.com/result?p=funcrate
