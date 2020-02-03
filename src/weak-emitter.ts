type Handler = (...args: any[]) => void

export function weakEmitter () {
  const events = new WeakMap()
  const newEvent = (key: object) => {
    const handlers = new Map()
    events.set(key, handlers)
    return handlers
  }

  return {
    on (key: object, handler: Handler) {
      (events.get(key) || newEvent(key))
        .set(handler, handler)
    },
    once (key: object, handler: Handler) {
      const handlers = events.get(key) || newEvent(key)
      handlers.set(handler, function () {
        handlers.delete(handler)
        handler(...arguments)
      })
    },

    emit (key: object, ...args: any[]) {
      const handlers = events.get(key)
      handlers && handlers.forEach((handler: Handler) => handler(...args))
    },

    clear (key: object) {
      events.delete(key)
    },

    off (key: object, handler: Handler) {
      const handlers = events.get(key)
      if (!handlers) return
      handlers.delete(handler)
    },

    transfer (origin: object, destination: object) {
      const handlers = events.get(origin)
      if (!handlers) return
      const event = (events.get(destination) || newEvent(destination))
      handlers.forEach((handler: Handler) => {
        event.set(handler, handler)
      })
      events.delete(origin)
    }
  }
}
