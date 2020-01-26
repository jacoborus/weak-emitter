weak-emitter
=================

ES6 WeakMap based event emitter in ~350 bytes

[![Build Status](https://travis-ci.org/jacoborus/weak-emitter.svg?branch=master)](https://travis-ci.org/jacoborus/weak-emitter) [![npm version](https://badge.fury.io/js/weak-emitter.svg)](https://www.npmjs.com/package/weak-emitter)

Weak-emitter stores events in **ES6 weakmaps**, so objects are the only valid type for the event keys.

```js
import { weakEmitter } from 'weak-emitter'
const emitter = weakEmitter()
const test = {}
emitter.on(test, (...args) => console.log(args))
emitter.emit(test, 1, 2, 3)
// => [1, 2, 3]
```

- **~350 bytes** when gzipped
- check [arbitrary-emitter](https://github.com/jacoborus/weak-emitter/tree/arbitrary-emitter) for a version that uses maps to store events


## Install

Install with [npm](https://www.npmjs.com/package/weak-emitter) or yarn, clone the repo or download and extract the [zip](https://github.com/jacoborus/weak-emitter/archive/master.zip).
Then import or insert it as script tag.


## Emitter API

- [on](#emitter-on-api)
- [once](#emitter-once-api)
- [emit](#emitter-emit-api)
- [off](#emitter-off-api)
- [clear](#emitter-clear-api)


<a name="emitter-on-api"></a>
### on(key, handler)

Adds the `handler` function to the event tagged with `key`. `key` has to be an object. Every handler will be added once, despite the number of times it was added to the event. Handlers are invoked in the order they were added.

```js
const key = {}
emitter.on(key, () => doSomething())
emitter.emit(key) // will `doSomething`
```


<a name="emitter-once-api"></a>
### once(key, handler)

Same as `on`, but `handler` will be triggered just once, then it will be removed.

```js
const key = {}
emitter.once(key, () => doSomethingOnce())
emitter.emit(key) // will `doSomethingOnce`
emitter.emit(key) // won't do anything
```


<a name="emitter-emit-api"></a>
### emit(key[, ...args])

Invoke all handlers tagged with `key`, passing the rest of the arguments

```js
const test = {}
emitter.on(test, (...args) => console.log(args))
emitter.emit(test, 1, 2, 3) // => [1, 2, 3]
```


<a name="emitter-off-api"></a>
### off(key, handler)

Removes `handler` from the event tagged with `key`

```js
emitter.off(key, action)
```


<a name="emitter-clear-api"></a>
### clear(key)

Removes the event and all its handlers

```js
emitter.off(key)
```


<a name="emitter-transfer-api"></a>
### transfer(originKey, destinationKey)

Transfer all the handlers from an event to another one

```js
const origin = {}
const destination = {}
emitter.transfer(origin, destination)
```


<a name="testing"></a>
## Testing

```sh
npm test
```

<br><br>

---

© 2020 [Jacobo Tabernero](http://jacoborus.codes) - Released under [MIT License](https://raw.github.com/jacoborus/weak-emitter/master/LICENSE)
