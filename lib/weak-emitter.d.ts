declare type EventHandler = (...args: any[]) => void;
declare type EventKey = string | object;
export interface EventController {
    off: EventHandler;
    transfer: (context: object) => void;
}
export declare function weakEmitter(): {
    on: (context: object, key: EventKey, handler: EventHandler) => EventController;
    off: (context: object, key: EventKey, handler: EventHandler) => void;
    emit: (context: object, key: EventKey, ...args: any[]) => void;
};
export {};
