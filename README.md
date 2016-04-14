arbitrary-emitter
=================

Event emitter with Map/Set sugar for browser and node.js apps

**arbitrary-emitter** allows to use arbitrary values as keys for your events

**arbitrary-emitter** is written in vanilla ES6, so maybe you want to transpile it before using it.

**Project in active development, API may change**

## Create a new emitter

```js
const emitter = arbitraryEmitter()
```

## Emitter API

- [emitter.add](#emitter-add-api)
- [emitter.addOnce](#emitter-addonce-api)
- [emitter.trigger](#emitter-trigger-api)
- [emitter.remove](#emitter-remove-api)
- [Testing](#testing)



<a name="emitter-add-api"></a>
### add(key, method)

Add a listener for `key` which will trigger `method` function. 
`key` can be any type of value.

`add` returns unsubscribe  method

```js
const obj = {}
let unsubscribe = emitter.add(obj, () => doSomething())
emitter.trigger(obj) // will `doSomething`
unsubscribe()
emitter.trigger(obj) // won't do anything
```



<a name="emitter-addonce-api"></a>
### addOnce(key, method)

Add a listener for `key` which will trigger `method` function just one time, then listener will be removed.
`key` can be any type of value

```js
const obj = {}
emitter.addOnce(obj, () => doSomethingOnce())
emitter.trigger(obj) // will `doSomething`
emitter.trigger(obj) // won't do anything
```



<a name="emitter-trigger-api"></a>
## emitter.trigger(key[, ...args])

Trigger methods binded to `key`, and pass the rest of arguments to it

```js
emitter.add('test', (a, b) => console.log(a + b))
emitter.trigger('test', 1, 2) // => 3
```



<a name="emitter-remove-api"></a>
## emitter.remove(key)

Remove all listeners binded to `key`

```js
emitter.remove(obj)
```



<a name="testing"></a>
## Testing

### Node

```sh
npm test
```


[![Build Status](https://travis-ci.org/jacoborus/arbitrary-emitter.svg?branch=master)](https://travis-ci.org/jacoborus/arbitrary-emitter)

<br><br>

---

© 2016 [Jacobo Tabernero](https://github.com/jacoborus) - Released under [MIT License](https://raw.github.com/jacoborus/arbitrary-emitter/master/LICENSE)
