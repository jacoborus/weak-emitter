"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function weakEmitter() {
    const contexts = new WeakMap();
    function newEvent(context) {
        const eventContext = new Map();
        contexts.set(context, eventContext);
        return eventContext;
    }
    function newStack(eventContext, key) {
        const stack = new Set();
        eventContext.set(key, stack);
        return stack;
    }
    function on(context, key, handler) {
        let eventContext = contexts.get(context) || newEvent(context);
        let stack = eventContext.get(key) || newStack(eventContext, key);
        stack.add(handler);
        return {
            off() { off(context, key, handler); },
            transfer(destination) {
                stack.delete(handler);
                if (!stack.size)
                    eventContext.delete(stack);
                context = destination;
                eventContext = contexts.get(context) || newEvent(context);
                stack = eventContext.get(key) || newStack(eventContext, key);
                stack.add(handler);
            }
        };
    }
    function emit(context, key, ...args) {
        const eventContext = contexts.get(context);
        if (!eventContext)
            return;
        const stack = eventContext.get(key);
        if (!stack)
            return;
        stack.forEach((handler) => handler(...args));
    }
    function off(context, key, handler) {
        const eventContext = contexts.get(context);
        if (!eventContext)
            return;
        const stack = eventContext.get(key);
        if (!stack)
            return;
        stack.delete(handler);
        if (!stack.size)
            eventContext.delete(stack);
    }
    return { on, off, emit };
}
exports.weakEmitter = weakEmitter;
