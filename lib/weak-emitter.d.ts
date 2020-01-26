declare type Handler = (...args: any[]) => void;
export declare function weakEmitter(): {
    on(key: object, handler: Handler): void;
    once(key: object, handler: Handler): void;
    emit(key: object, ...args: any[]): void;
    clear(key: object): void;
    off(key: object, handler: Handler): void;
    transfer(origin: object, destination: object): void;
};
export {};
