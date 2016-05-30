'use strict'

function arbitrary () {
  const events = new Map()
  const actions = new Map()

  function setActions (lis, triggers) {
    const size = triggers.length
    if (!size) {
      events.delete(lis.key)
      actions.delete(lis.key)
    } else if (size === 1) {
      actions.set(lis.key, triggers[0])
    } else {
      actions.set(lis.key, opts => {
        for (let i = 0; i < size; i++) {
          triggers[i](opts)
        }
      })
    }
  }

  const newListener = key => {
    const triggers = []

    const lis = {
      key,
      add (fn) {
        triggers.push(fn)
        setActions(lis, triggers)
      },
      rm (method) {
        let index = triggers.indexOf(method)
        if (index > -1) {
          triggers.splice(index, 1)
          setActions(lis, triggers)
        }
      }
    }

    events.set(key, lis)
    return lis
  }

  return {
    on (key, method) {
      const lis = events.get(key) || newListener(key)
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
      const lis = events.get(key) || newListener(key)
      lis.add(fn)
      function fn () {
        method(arguments)
        lis.rm(fn)
      }
    },

    emit (key, opts) {
      const action = actions.get(key)
      if (action) action(opts)
    },

    off (key, method) {
      if (!(1 in arguments)) {
        events.delete(key)
        actions.delete(key)
      } else if (events.has(key)) {
        events.get(key).rm(method)
      }
    }
  }
}

module.exports = arbitrary
