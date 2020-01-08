'use strict'

module.exports = () => {
  const events = new WeakMap()
  const newEvent = key => {
    const handlers = new Map()
    events.set(key, handlers)
    return handlers
  }

  return {
    on (key, handler) {
      (events.get(key) || newEvent(key))
        .set(handler, handler)
    },
    once (key, handler) {
      const handlers = events.get(key) || newEvent(key)
      handlers.set(handler, function () {
        handlers.delete(handler)
        handler(arguments)
      })
    },

    emit (key, ...args) {
      const handlers = events.get(key)
      handlers && handlers.forEach(handler => handler(...args))
    },

    off (key, handler) {
      if (!(0 in arguments)) return
      if (1 in arguments) {
        const handlers = events.get(key)
        handlers && handlers.delete(handler)
      } else {
        events.delete(key)
      }
    }
  }
}
