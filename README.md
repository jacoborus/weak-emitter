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
const key = {}
emitter.on(key, () => doSomething())
// will `doSomething`
emitter.emit(key)
```

## Emitter API

<a name="emitter-on-api"></a>
### on(eventKey, listener)

Adds the `listener` function to the end of the listeners array for the event tagged with `eventKey`. `eventKey` can be any type of value. A check is made to see if the listener has already been added so it won't be called multiple times. Event listeners are invoked in the order they are added.

`on` returns removeListener method

```js
const key = {}
let removeListener = emitter.on(key, () => doSomething())
emitter.emit(key) // will `doSomething`
emitter.emit(key) // will `doSomething`
removeListener()
emitter.emit(key) // won't do anything
```



<a name="emitter-addonce-api"></a>
### once(eventKey, listener)

Same as `on`, but `listener` will be triggered just one time, then it will be removed.

```js
const key = {}
emitter.once(key, () => doSomethingOnce())
emitter.emit(key) // will `doSomethingOnce`
emitter.emit(key) // won't do anything
```



<a name="emitter-emit-api"></a>
### emit(eventKey[, options])

Synchronously calls each of the listeners registered for the event tagged with `eventKey`, passing the supplied argument `options` to each

```js
emitter.on('test', (opts) => console.log(opts.test))
const options = { test: 'Testing!' }
emitter.emit('test', options) // => 'Testing!'
```



<a name="emitter-off-api"></a>
### off([eventKey[, listener]])

- When no argument is passed all the listeners and its eventKeys will be removed from the emitter
- If an `eventKey` but no `listener` is passed all the listeners and its key will be removed
- If `eventKey` and `listener` are passed as arguments just the listener will be removed from its group

```js
emitter.off(key, action) // will remove action from listeners
emitter.off(key) // will remove all the listeners tagged with `key`, and the tag itself
emitter.off() // will remove all the listeners from all the eventKeys and the eventKeys themselves
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
