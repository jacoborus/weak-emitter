declare type Handler = (...args: any[]) => void;
declare type EventKey = string | object;
export declare function weakEmitter(): {
    on: (context: object, key: EventKey, handler: Handler) => void;
    off: (context: object, key: EventKey, handler: Handler) => void;
    emit: (context: object, key: EventKey, ...args: any[]) => void;
};
export {};
