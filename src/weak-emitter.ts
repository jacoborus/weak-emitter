type EventHandler = (...args: any[]) => void
type EventKey = string | object
type EventStack = Set<EventHandler>
type EventContext = Map<EventKey, EventStack>
type Contexts = WeakMap<object, EventContext>

export interface EventController {
  off: EventHandler
  transfer: (context: object) => void
}

export function weakEmitter () {
  const contexts: Contexts = new WeakMap()

  function newEvent (context: object): EventContext {
    const eventContext: EventContext = new Map()
    contexts.set(context, eventContext)
    return eventContext
  }

  function newStack (eventContext: Map<EventKey, any>, key: EventKey): EventStack {
    const stack: EventStack = new Set()
    eventContext.set(key, stack)
    return stack
  }

  function on (context: object, key: EventKey, handler: EventHandler): EventController {
    let eventContext = contexts.get(context) || newEvent(context)
    let stack = eventContext.get(key) || newStack(eventContext, key)
    stack.add(handler)
    return {
      off () { off(context, key, handler) },
      transfer (destination: object) {
        stack.delete(handler)
        if (!stack.size) eventContext.delete(stack)
        context = destination
        eventContext = contexts.get(context) || newEvent(context)
        stack = eventContext.get(key) || newStack(eventContext, key)
        stack.add(handler)
      }
    }
  }

  function emit (context: object, key: EventKey, ...args: any[]): void {
    const eventContext = contexts.get(context)
    if (!eventContext) return
    const stack = eventContext.get(key)
    if (!stack) return
    stack.forEach((handler: EventHandler) => handler(...args))
  }

  function off (context: object, key: EventKey, handler: EventHandler): void {
    const eventContext = contexts.get(context)
    if (!eventContext) return
    const stack = eventContext.get(key)
    if (!stack) return
    stack.delete(handler)
    if (!stack.size) eventContext.delete(stack)
  }

  return { on, off, emit }
}
