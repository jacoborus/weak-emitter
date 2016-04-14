arbitrary-emitter
=================

Event emitter with Map/Set sugar for browser and node.js apps

[![Build Status](https://travis-ci.org/jacoborus/arbitrary-emitter.svg?branch=master)](https://travis-ci.org/jacoborus/arbitrary-emitter)

**arbitrary-emitter** allows to use arbitrary values as keys for your events

**arbitrary-emitter** is written in vanilla ES6, so maybe you want to transpile it before using it.

**Project in active development, API may change**

## Create a new emitter

```js
const emitter = arbitraryEmitter()
```

## Emitter API

- [emitter.on](#emitter-on-api)
- [emitter.once](#emitter-once-api)
- [emitter.emit](#emitter-emit-api)
- [emitter.off](#emitter-off-api)


<a name="emitter-on-api"></a>
### on(key, action)

Add a listener with `key` which will trigger `action` function. 
`key` can be any type of value.

`on` returns unsubscribe  method

```js
const obj = {}
let removeListener = emitter.on(obj, () => doSomething())
emitter.emit(obj) // will `doSomething`
removeListener()
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
## emitter.emit(key[, ...args])

`emit` methods binded to `key`, and pass the rest of the arguments to it

```js
emitter.on('test', (a, b) => console.log(a + b))
emitter.emit('test', 1, 2) // => 3
```



<a name="emitter-off-api"></a>
## emitter.off(key[, action])

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


<br><br>

---

© 2016 [Jacobo Tabernero](https://github.com/jacoborus) - Released under [MIT License](https://raw.github.com/jacoborus/arbitrary-emitter/master/LICENSE)
