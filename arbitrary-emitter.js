'use strict'

function arbitrary () {
  const events = new Map()
  const actions = new Map()

  function setActions (e, listeners) {
    let size = listeners.length
    if (!size) {
      events.delete(e.key)
      actions.delete(e.key)
    } else if (size === 1) {
      actions.set(e.key, listeners[0])
    } else {
      actions.set(e.key, opts => {
        let size = listeners.length
        while (size > 0) {
          listeners[--size](opts)
        }
      })
    }
  }

  const newListener = key => {
    const listeners = []

    const e = {
      key,
      add (fn) {
        if (listeners.indexOf(fn) === -1) {
          listeners.unshift(fn)
        }
        setActions(e, listeners)
      },
      rm (lis) {
        let index = listeners.indexOf(lis)
        if (index > -1) {
          listeners.splice(index, 1)
          setActions(e, listeners)
        }
      }
    }

    events.set(key, e)
    return e
  }

  return {
    on (key, lis) {
      const e = events.get(key) || newListener(key)
      e.add(lis)
      let isSubscribed = true
      return () => {
        if (isSubscribed) {
          e.rm(lis)
          isSubscribed = false
        }
      }
    },

    once (key, lis) {
      const e = events.get(key) || newListener(key)
      e.add(fn)
      function fn () {
        lis(arguments)
        e.rm(fn)
      }
    },

    emit (key, opts) {
      const action = actions.get(key)
      if (action) action(opts)
    },

    off (key, lis) {
      if (!(1 in arguments)) {
        events.delete(key)
        actions.delete(key)
      } else if (events.has(key)) {
        events.get(key).rm(lis)
      }
    }
  }
}

module.exports = arbitrary
