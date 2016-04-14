'use strict'

const test = require('tape')
const ae = require('./arbitrary-emitter.js')

test('on and emit', t => {
  const emitter = ae()
  const obj = {}
  let control = 0
  let unsubscribe = emitter.on(obj, () => ++control)
  emitter.emit(obj)
  t.is(control, 1, 'trigger')
  emitter.emit(obj)
  t.is(control, 2, 'trigger')
  unsubscribe()
  emitter.emit(obj)
  t.is(control, 2, 'unsubscribe')
  t.end()
})

test('once', t => {
  const emitter = ae()
  const obj = {}
  let control = 0
  emitter.once(obj, () => ++control)
  emitter.emit(obj)
  t.is(control, 1, 'trigger once')
  emitter.emit(obj)
  t.is(control, 1, 'automatic unsubscription')
  t.end()
})

test('off', t => {
  const emitter = ae()
  const obj = {}
  let control = 0
  emitter.on(obj, () => ++control)
  emitter.on(obj, () => ++control)
  emitter.emit(obj)
  t.is(control, 2, 'control')
  emitter.off(obj)
  emitter.emit(obj)
  t.is(control, 2, 'remove link from subscriptions')
  t.end()
})

test('emit with arguments', t => {
  const emitter = ae()
  const obj = {}
  let control = ''
  emitter.on(obj, () => {control = control + 'a'})
  emitter.emit(obj)
  t.is(control, 'a', 'trigger')
  emitter.emit(obj)
  t.is(control, 'aa', 'trigger')

  emitter.on(obj, () => {control = control + 'b'})
  emitter.emit(obj)
  t.is(control, 'aaab', 'unsubscribe')

  emitter.on(obj, () => {control = control + 'c'})
  emitter.emit(obj)
  t.is(control, 'aaababc', 'unsubscribe')

  t.end()
})
