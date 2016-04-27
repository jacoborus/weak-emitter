arbitrary-emitter
=================

Event emitter with Map/Set sugar for modern browsers and node.js (~500 bytes). [arbitrary-emitter.jacoborus.codes](http://arbitrary-emitter.jacoborus.codes)

[![Build Status](https://travis-ci.org/jacoborus/arbitrary-emitter.svg?branch=master)](https://travis-ci.org/jacoborus/arbitrary-emitter) [![npm version](https://badge.fury.io/js/arbitrary-emitter.svg)](https://www.npmjs.com/package/arbitrary-emitter)

**arbitrary-emitter** stores listeners and actions in Maps, this allows to use arbitrary values as keys for your listeners.

It's written in vanilla ES6, so you will have to transpile it before using it in old browsers or node.js < v5.9

## Features

- works in browsers and node.js
- allows to use **arbitrary values** as keys for listeners
- really small footprint (**~500 bytes** when gzipped)
- **blazing fast**
- conventional api (`on`, `off`, `once` and `emit`)
- `on` method returns an unsubscription function (like in redux.js)

## Usage

Install with [npm](https://www.npmjs.com/package/arbitrary-emitter), clone the repo or download and extract the [zip](https://github.com/jacoborus/arbitrary-emitter/archive/master.zip). Then import or insert it as script tag.

```js
const emitter = arbitraryEmitter()
const obj = {}
emitter.on(obj, () => doSomething())
// will `doSomething`
emitter.emit(obj)
```

## Emitter API

<a name="emitter-on-api"></a>
### on(key, action)

Adds the listener `action` to the `Set` for the event tagged with `key`. 
`key` can be any type of value.

`on` returns removeListener  method

```js
const obj = {}
let removeListener = emitter.on(obj, () => doSomething())
emitter.emit(obj) // will `doSomething`
emitter.emit(obj) // will `doSomething`
removeListener()
emitter.emit(obj) // won't do anything
```



<a name="emitter-addonce-api"></a>
### once(key, action)

Adds the listener `action` to the `Set` for the event tagged with `key`. `action` will be triggered just one time, then it will be removed.
`key` can be any type of value

```js
const obj = {}
emitter.once(obj, () => doSomethingOnce())
emitter.emit(obj) // will `doSomethingOnce`
emitter.emit(obj) // won't do anything
```



<a name="emitter-emit-api"></a>
### emit(key[, ...args])

Synchronously calls each of the listeners registered for the event tagged with `key`, and pass the rest of the arguments to them

```js
emitter.on('test', (a, b) => console.log(a + b))
emitter.emit('test', 1, 2) // => 3
```



<a name="emitter-trigger-api"></a>
### emit(key[, args])

Synchronously calls each of the listeners registered for the event tagged with `key`, and pass `args` array as arguments to them

```js
emitter.on('test', (a, b) => console.log(a + b))
emitter.trigger('test', [1, 2]) // => 3
```



<a name="emitter-off-api"></a>
### off(key[, action])

Remove `action` from listeners tagged with `key`. If no `action` is specified will remove all listeners tagged with `key`

```js
emitter.off(key, action) // will remove action from listeners
emitter.off(key) // will remove all the listeners tagged with `key`, and the tag itself
```



<a name="testing"></a>
## Testing

### Node

```sh
npm test
```

### Browser

Build browser tests (`npm run build-tests`) and open `test/test.html`



<a name="building"></a>
## Building

- Build UMD file: `npm run build-umd`
- Build browser tests: `npm run build-tests`
- Run both builds: `npm run build`


<br><br>

---

© 2016 [Jacobo Tabernero](https://github.com/jacoborus) - Released under [MIT License](https://raw.github.com/jacoborus/arbitrary-emitter/master/LICENSE)
