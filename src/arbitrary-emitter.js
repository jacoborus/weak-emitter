'use strict'

module.exports = () => {
  const events = new Map()
  const newEvent = key => {
    const handlers = new Map()
    events.set(key, handlers)
    return handlers
  }

  return {
    on (key, handler) {
      (events.get(key) || newEvent(key)).set(handler, handler)
    },
    once (key, handler) {
      const handlers = events.get(key) || newEvent(key)
      handlers.set(handler, function () {
        handler(arguments)
        handlers.delete(handler)
      })
    },

    emit (key, ...args) {
      const handlers = events.get(key)
      handlers && handlers.forEach(handler => handler(...args))
    },

    off (key, handler) {
      const handlers = events.get(key)
      if (!handlers) return
      if (1 in arguments) {
        handlers.delete(handler)
      } else {
        events.delete(key)
      }
    },

    listeners (key) {
      const handlers = events.get(key)
      return handlers
        ? [...handlers.values()]
        : []
    }
  }
}
