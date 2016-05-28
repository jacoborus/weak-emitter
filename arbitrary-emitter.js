'use strict'

function arbitrary () {
  const listeners = new Map()

  function setEmitters (lis, triggers) {
    const size = triggers.size
    if (!size) listeners.delete(lis.key)
    else if (size === 1) {
      let fn
      triggers.forEach(f => { fn = f })
      lis.launch0 = lis.launch1 = fn
      lis.launchX = args => fn.apply(fn, args)
    } else {
      lis.launch0 = () => triggers.forEach(f => f())
      lis.launch1 = (a, b) => triggers.forEach(f => f(a, b))
      lis.launchX = lis.trigger
    }
  }

  const newListener = key => {
    const triggers = new Set()

    const lis = {
      key,
      add (fn) {
        triggers.add(fn)
        setEmitters(lis, triggers)
      },
      rm (method) {
        triggers.delete(method)
        setEmitters(lis, triggers)
      },
      trigger (args) {
        triggers.forEach(f => f.apply(f, args))
      }
    }

    listeners.set(key, lis)
    return lis
  }

  return {
    on (key, method) {
      const lis = listeners.get(key) || newListener(key)
      lis.add(method)
      let isSubscribed = true
      return () => {
        if (isSubscribed) {
          lis.rm(method)
          isSubscribed = false
        }
      }
    },

    once (key, method) {
      const lis = listeners.get(key) || newListener(key)
      lis.add(fn)
      function fn () {
        method(arguments)
        lis.rm(fn)
      }
    },

    emit (key) {
      const lis = listeners.get(key)
      if (!lis) return
      const al = arguments.length
      if (al === 1) lis.launch0()
      else if (al > 4) lis.launch1(arguments[1], arguments[2])
      else {
        let args = new Array(al - 1)
        for (let i = 1; i < al; ++i) {
          args[i - 1] = arguments[i]
        }
        lis.launchX(args)
      }
    },

    trigger (key) {
      const lis = listeners.get(key)
      if (!lis) return
      if (arguments.length === 1) {
        return lis.launch0()
      }
      let args = arguments[1]
      if (typeof args !== 'object') {
        throw new Error('arguments has wrong type')
      }
      lis.trigger(args)
    },

    off (key, action) {
      if (!(1 in arguments)) listeners.delete(key)
      else if (listeners.has(key)) listeners.get(key).rm(action)
    }
  }
}

module.exports = arbitrary
