"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function weakEmitter() {
    const events = new WeakMap();
    const newEvent = (key) => {
        const handlers = new Map();
        events.set(key, handlers);
        return handlers;
    };
    return {
        on(key, handler) {
            (events.get(key) || newEvent(key))
                .set(handler, handler);
        },
        once(key, handler) {
            const handlers = events.get(key) || newEvent(key);
            handlers.set(handler, function () {
                handlers.delete(handler);
                handler(...arguments);
            });
        },
        emit(key, ...args) {
            const handlers = events.get(key);
            handlers && handlers.forEach((handler) => handler(...args));
        },
        clear(key) {
            events.delete(key);
        },
        off(key, handler) {
            const handlers = events.get(key);
            if (!handlers)
                return;
            handlers.delete(handler);
        },
        transfer(origin, destination) {
            const handlers = events.get(origin);
            if (!handlers)
                return;
            const event = (events.get(destination) || newEvent(destination));
            handlers.forEach((handler) => {
                event.set(handler, handler);
            });
            events.delete(origin);
        }
    };
}
exports.weakEmitter = weakEmitter;
