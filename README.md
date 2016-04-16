arbitrary-emitter
=================

High performance event emitter with Map/Set sugar for node.js and browsers (<500 bytes when gzipped)

[![Build Status](https://travis-ci.org/jacoborus/arbitrary-emitter.svg?branch=master)](https://travis-ci.org/jacoborus/arbitrary-emitter) [![npm version](https://badge.fury.io/js/arbitrary-emitter.svg)](https://www.npmjs.com/package/arbitrary-emitter)

**arbitrary-emitter** stores listeners and actions in ES6 Map and Sets, this allows to use arbitrary values as keys for your listeners

**arbitrary-emitter** is written in vanilla ES6, so you will have to transpile it before using it in old browsers or node.js < v5.9


## Create a new emitter

```js
const emitter = arbitraryEmitter()
```

## Emitter API

<a name="emitter-on-api"></a>
### on(key, action)

Add a listener with `key` which will trigger `action` function. 
`key` can be any type of value.

`on` returns unsubscribe  method

```js
const obj = {}
let removeAction = emitter.on(obj, () => doSomething())
emitter.emit(obj) // will `doSomething`
removeAction()
emitter.emit(obj) // won't do anything
```



<a name="emitter-addonce-api"></a>
### once(key, action)

Add a listener for `key` which will trigger `action` function just one time, then listener will be removed.
`key` can be any type of value

```js
const obj = {}
emitter.once(obj, () => doSomethingOnce())
emitter.emit(obj) // will `doSomething`
emitter.emit(obj) // won't do anything
```



<a name="emitter-emit-api"></a>
### emit(key[, ...args])

`emit` methods binded to `key`, and pass the rest of the arguments to it

```js
emitter.on('test', (a, b) => console.log(a + b))
emitter.emit('test', 1, 2) // => 3
```



<a name="emitter-off-api"></a>
### off(key[, action])

Remove `action` from listener `key`. If no action is specified will remove all listeners binded to `key`

```js
emitter.off(key, action) // will remove action from listener `key`
emitter.off(key) // will remove the listener `key` and all actions binded to it
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
