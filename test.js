'use strict'

const test = require('tape')
const ae = require('./arbitrary-emitter.js')

test('hello world', t => {
  const emitter = ae()
  const obj = {}
  let control = 0
  emitter.add(obj, () => ++control)
  emitter.trigger(obj)
  t.is(control, 1)
  emitter.trigger(obj)
  t.is(control, 2)
  t.end()
})
