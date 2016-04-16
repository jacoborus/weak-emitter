'use strict'

function arbitrary () {
  const listeners = new Map()

  function createNewLink (key) {
    const bindings = new Set()

    const link = {
      add (fn) {
        bindings.add(fn)
        let size = bindings.size
        if (size === 1) {
          link.launch0 = fn
          link.launchX = function () {
            fn.apply(fn, arguments[0])
          }
        } else if (size === 2) {
          // link.launch0 = () => bindings.forEach(f => f())
          link.launch0 = a => bindings.forEach(f => f(a))
          link.launchX = function () {
            let a = arguments[0]
            bindings.forEach(f => f.apply(f, a))
          }
        }
      },
      rm (method) {
        bindings.delete(method)
        let size = bindings.size
        if (size === 0) {
          listeners.delete(key)
        } else if (size === 1) {
          let fn
          bindings.forEach(f => {fn = f})
          link.launch0 = fn
          link.launchX = function () {
            fn.apply(fn, arguments[0])
          }
        } else if (size === 2) {
          // link.launch0 = () => bindings.forEach(f => f())
          link.launch0 = a => bindings.forEach(f => f(a))
          link.launchX = function () {
            let a = arguments[0]
            bindings.forEach(f => f.apply(f, a))
          }
        }
      }
    }

    listeners.set(key, link)
    return link
  }

  return {
    on (key, method) {
      const link = listeners.get(key) || createNewLink(key)
      link.add(method)
      let isSubscribed = true
      return () => {
        if (isSubscribed) {
          link.rm(method)
          isSubscribed = false
        }
      }
    },

    once (key, method) {
      const link = listeners.get(key) || createNewLink(key)
      link.add(fn)
      function fn () {
        method(arguments)
        link.rm(fn)
      }
    },

    emit (key) {
      const link = listeners.get(key)
      if (!link) return
      const l = arguments.length
      switch (l) {
        case 1: {
          link.launch0()
          break
        }
        case 2: {
          link.launch0(arguments[1])
          break
        }
        default: {
          let l = arguments.length
          let args = new Array(l - 1)
          for (let i = 1; i < l; ++i) {
            args[i - 1] = arguments[i]
          }
          link.launchX(args)
        }
      }
    },

    off (key, action) {
      if (1 in arguments) {
        let link = listeners.get(key)
        if (link) link.rm(action)
      } else {
        listeners.delete(key)
      }
    }
  }
}

module.exports = arbitrary
