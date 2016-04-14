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
- [emitter.trigger](#emitter-trigger-api)
- [Testing](#testing)



<a name="emitter-add-api"></a>
### add(key, method)

Create a listener for `key` which will trigger `method` function.
`key` can be any type of value

```js
const obj = {}
emitter.add(obj, () => doSomething())
```



<a name="emitter-trigger-api"></a>
## emitter.trigger(key)

Trigger methods binded to `key`

```js
emitter.trigger(obj)
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
