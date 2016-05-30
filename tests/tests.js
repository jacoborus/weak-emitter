'use strict'

const test = require('tape')
const ae = require('../arbitrary-emitter.js')

test('on and emit', t => {
  const emitter = ae()
  const obj = {}
  let control = 0
  const fn = () => ++control
  let unsubscribe = emitter.on(obj, fn)
  emitter.emit(obj)
  t.is(control, 1, 'trigger')
  emitter.emit(obj)
  t.is(control, 2, 'trigger')
  emitter.on(obj, fn)
  emitter.emit(obj)
  t.is(control, 3, 'trigger')
  unsubscribe()
  emitter.emit(obj)
  t.is(control, 3, 'unsubscribe')
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

test('off listener', t => {
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

test('off action', t => {
  const emitter = ae()
  const obj = {}
  let control = {
    a: 0,
    b: 0
  }
  const fn = () => ++control.b
  emitter.on(obj, () => ++control.a)
  emitter.on(obj, fn)
  emitter.emit(obj)
  t.is(control.a, 1, 'control a')
  t.is(control.b, 1, 'control b')
  emitter.off(obj, fn)
  emitter.emit(obj)
  t.is(control.a, 2, 'control a')
  t.is(control.b, 1, 'control b')
  t.end()
})

test('emit actions in order', t => {
  const emitter = ae()
  const obj = {}
  let control = ''
  emitter.on(obj, () => { control = control + 'a' })
  emitter.emit(obj)
  t.is(control, 'a', 'trigger')
  emitter.emit(obj)
  t.is(control, 'aa', 'trigger')

  emitter.on(obj, () => { control = control + 'b' })
  emitter.emit(obj)
  t.is(control, 'aaab', 'unsubscribe')

  emitter.on(obj, () => { control = control + 'c' })
  emitter.emit(obj)
  t.is(control, 'aaababc', 'unsubscribe')

  t.end()
})

test('emit with arguments', t => {
  const emitter = ae()
  const obj = {}
  let control = {
    a: 0
  }
  emitter.on(obj, a => { control.a = a })

  emitter.emit(obj, 1)
  t.is(control.a, 1)

  t.end()
})
