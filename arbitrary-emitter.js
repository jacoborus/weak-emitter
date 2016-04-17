'use strict'

function arbitrary () {
  const listeners = new Map()

  const oneTrigger = (fn, lis) => {
    lis.launch1 = fn
    lis.launchX = function () {
      fn.apply(fn, arguments[0])
    }
  }

  const multipleTriggers = (triggers, lis) => {
    lis.launch1 = (a, b) => triggers.forEach(f => f(a, b))
    lis.launchX = function () {
      let a = arguments[0]
      triggers.forEach(f => f.apply(f, a))
    }
  }

  const newListener = key => {
    const triggers = new Set()

    const lis = {
      add (fn) {
        triggers.add(fn)
        let size = triggers.size
        if (size === 1) {
          oneTrigger(fn, lis)
        } else if (size === 2) {
          multipleTriggers(triggers, lis)
        }
      },
      rm (method) {
        triggers.delete(method)
        let size = triggers.size
        if (!size) {
          listeners.delete(key)
        } else if (size === 1) {
          let fn
          triggers.forEach(f => {fn = f})
          oneTrigger(fn, lis)
        } else if (size === 2) {
          multipleTriggers(triggers, lis)
        }
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
      switch (arguments.length) {
        case 1: {
          lis.launch1()
          break
        }
        case 2: {
          lis.launch1(arguments[1])
          break
        }
        case 3: {
          lis.launch1(arguments[1], arguments[2])
          break
        }
        default: {
          let l = arguments.length
          let args = new Array(l - 1)
          for (let i = 1; i < l; ++i) {
            args[i - 1] = arguments[i]
          }
          lis.launchX(args)
        }
      }
    },

    off (key, action) {
      if (1 in arguments) {
        let lis = listeners.get(key)
        if (lis) lis.rm(action)
      } else {
        listeners.delete(key)
      }
    }
  }
}

module.exports = arbitrary
