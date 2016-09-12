arbitrary-emitter
=================

High performance event emitter for modern browsers in ~450 bytes.

[![Build Status](https://travis-ci.org/jacoborus/arbitrary-emitter.svg?branch=master)](https://travis-ci.org/jacoborus/arbitrary-emitter) [![npm version](https://badge.fury.io/js/arbitrary-emitter.svg)](https://www.npmjs.com/package/arbitrary-emitter) ![npm dependencies](https://david-dm.org/jacoborus/arbitrary-emitter.svg)


## Features

This event emitter was designed with 4 goals in mind:

- Be lightweight: **~450 bytes** when gzipped
- Be fast: it's optimized for being quick even with lots of emitters
- Be conventional: with conventional api (`on`, `off`, `once` and `emit`)
- Be modern: it stores listeners in **ES6 maps**, so you can use any kind of value as key for the listeners (Seeusage example)

It's written in vanilla ES6, so you will have to transpile it before using it in old browsers or node.js < v5.9

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

- [on](#emitter-on-api)
- [off](#emitter-off-api)
- [once](#emitter-once-api)
- [emit](#emitter-emit-api)
- [listeners](#emitter-listeners-api)

<a name="emitter-on-api"></a>
### on(eventKey, listener)

Adds the `listener` function to the end of the listeners array for the event tagged with `eventKey`. `eventKey` can be any type of value. A check is made to see if the listener has already been added so it won't be called multiple times. Event listeners are invoked in the order they are added.

```js
const key = {}
emitter.on(key, () => doSomething())
emitter.emit(key) // will `doSomething`
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



<a name="emitter-listeners-api"></a>
### listeners(eventKey)

Returns a copy of the array of listeners for the event tagged `eventKey`

```js
const key = {}
const f1 = () => console.log('f1')
const f2 = () => console.log('f2')
emitter.on(key, f1)
emitter.on(key, f2)
emitter.listeners(key)[0] === f1 // true
emitter.listeners(key)[1] === f2 // true
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

© 2016 [Jacobo Tabernero](http://jacoborus.codes) - Released under [MIT License](https://raw.github.com/jacoborus/arbitrary-emitter/master/LICENSE)
