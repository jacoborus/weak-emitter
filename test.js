'use strict'

const test = require('tape')
const ae = require('./arbitrary-emitter.js')

test('add and trigger', t => {
  const emitter = ae()
  const obj = {}
  let control = 0
  let unsubscribe = emitter.add(obj, () => ++control)
  emitter.trigger(obj)
  t.is(control, 1, 'trigger')
  emitter.trigger(obj)
  t.is(control, 2, 'trigger')
  unsubscribe()
  emitter.trigger(obj)
  t.is(control, 2, 'unsubscribe')
  t.end()
})

test('add once', t => {
  const emitter = ae()
  const obj = {}
  let control = 0
  emitter.addOnce(obj, () => ++control)
  emitter.trigger(obj)
  t.is(control, 1, 'trigger once')
  emitter.trigger(obj)
  t.is(control, 1, 'automatic unsubscription')
  t.end()
})
