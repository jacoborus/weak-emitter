type Handler = (...args: any[]) => void
type EventStack = Set<Handler>
type EventContext = Map<EventKey, EventStack>
type EventKey = string | object

export function weakEmitter () {
  const contexts: WeakMap<object, EventContext> = new WeakMap()

  function newEvent (context: object): EventContext {
    const event: EventContext = new Map()
    contexts.set(context, event)
    return event
  }

  function newStack (event: Map<EventKey, any>, key: EventKey): EventStack {
    const stack: EventStack = new Set()
    event.set(key, stack)
    return stack
  }

  function on (context: object, key: EventKey, handler: Handler): void {
    const event = contexts.get(context) || newEvent(context)
    const stack = event.get(key) || newStack(event, key)
    stack.add(handler)
  }

  function emit (context: object, key: EventKey, ...args: any[]): void {
    const event = contexts.get(context)
    if (!event) return
    const stack = event.get(key)
    if (!stack) return
    stack.forEach((handler: Handler) => handler(...args))
  }

  function off (context: object, key: EventKey, handler: Handler): void {
    const event = contexts.get(context)
    if (!event) return
    const stack = event.get(key)
    if (!stack) return
    stack.delete(handler)
    if (!stack.size) event.delete(stack)
  }

  return { on, off, emit }
}
