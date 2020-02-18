import test from 'tape'
import { weakEmitter } from './weak-emitter'

test('on and emit', t => {
  const emitter = weakEmitter()
  const obj = {}
  let control = 0
  const fn = () => ++control
  emitter.on(obj, obj, fn)
  emitter.emit(obj, obj)
  t.is(control, 1, 'trigger')
  emitter.emit(obj, obj)
  t.is(control, 2, 'trigger')
  emitter.on(obj, obj, fn)
  emitter.emit(obj, obj)
  t.is(control, 3, 'trigger')
  t.end()
})

test('off action', t => {
  const emitter = weakEmitter()
  const obj = {}
  const control = {
    a: 0,
    b: 0
  }
  const fn = () => ++control.b
  emitter.on(obj, obj, () => ++control.a)
  emitter.on(obj, obj, fn)
  emitter.emit(obj, obj)
  t.is(control.a, 1, 'control a')
  t.is(control.b, 1, 'control b')
  emitter.off(obj, obj, fn)
  emitter.emit(obj, obj)
  t.is(control.a, 2, 'control a')
  t.is(control.b, 1, 'control b')
  t.end()
})

test('eventController#off', t => {
  const ee = weakEmitter()
  const obj = {}
  const event = ee.on(obj, 'a', () => { t.fail() })
  event.off()
  ee.emit(obj, 'a')
  t.pass()
  t.end()
})

test('eventController#transfer', t => {
  t.plan(1)
  const ee = weakEmitter()
  const pass = () => t.pass()
  const fail = () => t.fail()
  const control = {
    action: pass
  }
  const obj = {}
  const dest = {}
  const event = ee.on(obj, 'a', () => { control.action() })

  event.transfer(dest)
  ee.emit(dest, 'a')

  control.action = fail
  ee.emit(obj, 'a')

  event.off()
  ee.emit(dest, 'a')

  t.end()
})

test('emit actions in order', t => {
  const emitter = weakEmitter()
  const obj = {}
  let control = ''
  emitter.on(obj, obj, () => { control = control + 'a' })
  emitter.emit(obj, obj)
  t.is(control, 'a', 'trigger')
  emitter.emit(obj, obj)
  t.is(control, 'aa', 'trigger')

  emitter.on(obj, obj, () => { control = control + 'b' })
  emitter.emit(obj, obj)
  t.is(control, 'aaab', 'unsubscribe')

  emitter.on(obj, obj, () => { control = control + 'c' })
  emitter.emit(obj, obj)
  t.is(control, 'aaababc', 'unsubscribe')

  t.end()
})

test('emit with arguments', t => {
  const emitter = weakEmitter()
  const obj = {}
  const control = {
    a: 0
  }
  emitter.on(obj, obj, a => { control.a = a })

  emitter.emit(obj, obj, 1)
  t.is(control.a, 1)

  t.end()
})

test('remove listener in a event with muliple listeners', t => {
  const emitter = weakEmitter()
  const out: number[] = []
  const tt = {}
  const f1 = () => out.push(1)
  const f3 = () => out.push(3)
  const f2 = () => {
    out.push(2)
    emitter.off(tt, tt, f3)
  }
  emitter.on(tt, tt, f1)
  emitter.on(tt, tt, f2)
  emitter.on(tt, tt, f3)
  emitter.emit(tt, tt)
  t.is(out[0], 1)
  t.is(out[1], 2)
  t.notOk(out[2])
  emitter.emit(tt, tt)
  t.is(out[2], 1)
  t.is(out[3], 2)
  t.end()
})
