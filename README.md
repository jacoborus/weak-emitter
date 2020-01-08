weak-emitter
=================

ES6 WeakMap based event emitter in ~350 bytes

[![Build Status](https://travis-ci.org/jacoborus/weak-emitter.svg?branch=master)](https://travis-ci.org/jacoborus/weak-emitter) [![npm version](https://badge.fury.io/js/weak-emitter.svg)](https://www.npmjs.com/package/weak-emitter) ![npm dependencies](https://david-dm.org/jacoborus/weak-emitter.svg)

Weak-emitter stores events in **ES6 weakmaps**, so objects are the only valid type for the event keys.

```js
const emitter = weakEmitter()
const key = {}
emitter.on(key, () => doSomething())
// will `doSomething`
emitter.emit(key)
```

- **~350 bytes** when gzipped
- conventional api (`on`, `off`, `once` and `emit`)
- check [arbitrary-emitter](https://github.com/jacoborus/weak-emitter/tree/arbitrary-emitter) for a version that uses maps to store events


## Install

Install with [npm](https://www.npmjs.com/package/weak-emitter) or yarn, clone the repo or download and extract the [zip](https://github.com/jacoborus/weak-emitter/archive/master.zip).
Then import or insert it as script tag.


## Emitter API

- [on](#emitter-on-api)
- [off](#emitter-off-api)
- [once](#emitter-once-api)
- [emit](#emitter-emit-api)

<a name="emitter-on-api"></a>
### on(key, handler)

Adds the `handler` function to the event tagged with `key`. `key` can be any type of value. Every handler will be added once, despite the number of times it was added to the event. Handlers are invoked in the order they were added.

```js
const key = {}
emitter.on(key, () => doSomething())
emitter.emit(key) // will `doSomething`
```



<a name="emitter-once-api"></a>
### once(key, handler)

Same as `on`, but `listener` will be triggered just once, then it will be removed.

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
emitter.on('test', (opts) => console.log(opts.test))
const options = { test: 'Testing!' }
emitter.emit('test', options) // => 'Testing!'
```



<a name="emitter-off-api"></a>
### off([key[, handler]])

- If a `key` but no `handler` is passed the event will be removed
- If `key` and `handler` are passed as arguments just the handler will be removed from the event

```js
emitter.off(key, action) // will remove action from listeners
emitter.off(key) // will remove all the listeners tagged with `key`, and the tag itself
```


<a name="testing"></a>
## Testing

```sh
npm test
```

<br><br>

---

© 2020 [Jacobo Tabernero](http://jacoborus.codes) - Released under [MIT License](https://raw.github.com/jacoborus/weak-emitter/master/LICENSE)
