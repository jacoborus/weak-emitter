"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function weakEmitter() {
    const contexts = new WeakMap();
    function newEvent(context) {
        const event = new Map();
        contexts.set(context, event);
        return event;
    }
    function newStack(event, key) {
        const stack = new Set();
        event.set(key, stack);
        return stack;
    }
    function on(context, key, handler) {
        const event = contexts.get(context) || newEvent(context);
        const stack = event.get(key) || newStack(event, key);
        stack.add(handler);
    }
    function emit(context, key, ...args) {
        const event = contexts.get(context);
        if (!event)
            return;
        const stack = event.get(key);
        if (!stack)
            return;
        stack.forEach((handler) => handler(...args));
    }
    function off(context, key, handler) {
        const event = contexts.get(context);
        if (!event)
            return;
        const stack = event.get(key);
        if (!stack)
            return;
        stack.delete(handler);
        if (!stack.size)
            event.delete(stack);
    }
    return { on, off, emit };
}
exports.weakEmitter = weakEmitter;
