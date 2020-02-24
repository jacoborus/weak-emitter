weak-emitter
============

Contexts based event emitter on ES6 WeakMaps

[![Build Status](https://travis-ci.org/jacoborus/weak-emitter.svg?branch=master)](https://travis-ci.org/jacoborus/weak-emitter) [![npm version](https://badge.fury.io/js/weak-emitter.svg)](https://www.npmjs.com/package/weak-emitter)


```js
const context = {}
const eventKey = 'propName'
emitter.on(context, eventKey, (...args) => console.log(args))
emitter.emit(context, eventKey, 'first', 2, true)
// ['first', 2, true]
```


## Install

```sh
npm i weak-emitter --save
# or: yarn add weak-emitter
```

## Emitter API

- [on](#emitter-on-api)
- [emit](#emitter-emit-api)
- [off](#emitter-off-api)

**Argument types:**

- `context: object`
- `eventKey: string | object`
- `handler: (...args: []) => void`

<a name="emitter-on-api"></a>
### on(context, eventKey, handler)

Create new event with `eventKey` in `context` that will trigger the `handler`.
Every handler will be added once, despite the number of times it was added to the event. Handlers are invoked in the order they were added.

Returns an event controller that has three methods:

- emit(...args): trigger handler
- off(): remove event
- tranfer(destination): moves the event to `destination` context

```js
const context = {}
const eventKey = 'propName'
const evController = emitter.on(context, eventKey, (...args) => doSomething(args))

const ctx2 = {}
evController.transfer(ctx2)
evController.off()

```


<a name="emitter-emit-api"></a>
### emit(context, eventKey[, ...args])

Invoke all handlers in `context` tagged with `key`, passing the rest of the arguments

```js
const context = {}
const eventKey = 'propName'
emitter.on(context, eventKey, (...args) => console.log(args))
emitter.emit(context, eventKey, 'first', 2, true)
// ['first', 2, true]
```


<a name="emitter-off-api"></a>
### off(context, key, handler)

Removes `handler` from the event tagged with `key` in `context`

```js
emitter.off(context, eventKey, handler)
```


<a name="testing"></a>
## Testing

```sh
npm test
```

<br><br>

---

© 2020 [Jacobo Tabernero](http://jacoborus.codes) - Released under [MIT License](https://raw.github.com/jacoborus/weak-emitter/master/LICENSE)
