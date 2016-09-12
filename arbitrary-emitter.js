'use strict'

module.exports = () => {
  const events = new Map()
  const actions = new Map()

  function setActions (e) {
    const listeners = e.listeners.filter(l => l)
    let size = listeners.length
    if (!size) {
      events.delete(e.key)
      actions.delete(e.key)
    } else if (size === 1) {
      actions.set(e.key, (a, b, c) => {
        const fn = listeners[0]
        if (fn) fn(a, b, c)
      })
    } else {
      actions.set(e.key, (a, b, c) => {
        e.running.push(listeners)
        let size = listeners.length
        while (size > 0) {
          const fn = listeners[--size]
          if (fn) fn(a, b, c)
        }
        e.running.pop()
      })
    }
  }

  const newListener = key => {
    const listeners = []
    const running = []

    function trash (list, lis) {
      let index = list.indexOf(lis)
      if (index > -1) delete list[index]
    }

    const e = {
      key,
      listeners,
      running,
      add (fn) {
        if (listeners.indexOf(fn) === -1) {
          listeners.unshift(fn)
        }
        setActions(e)
      },
      rm (lis) {
        trash(listeners, lis)
        if (running.length) {
          running.forEach(list => trash(list, lis))
        }
        setActions(e)
      }
    }

    events.set(key, e)
    return e
  }

  return {
    on (key, lis) {
      (events.get(key) || newListener(key)).add(lis)
    },

    once (key, lis) {
      const e = events.get(key) || newListener(key)
      e.add(function fn () {
        lis(arguments)
        e.rm(fn)
      })
    },

    emit (key, a, b, c) {
      const action = actions.get(key)
      if (action) action(a, b, c)
    },

    off (key, lis) {
      if (1 in arguments) {
        events.get(key).rm(lis)
      } else if (events.has(key)) {
        events.delete(key)
        actions.delete(key)
      }
    },

    listeners (key) {
      const e = events.get(key)
      if (e) return e.listeners.slice(0).reverse()
      else return []
    }
  }
}
