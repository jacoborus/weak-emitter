var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tape", "./weak-emitter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tape_1 = __importDefault(require("tape"));
    const weak_emitter_1 = require("./weak-emitter");
    tape_1.default('on and emit', t => {
        const emitter = weak_emitter_1.weakEmitter();
        const obj = {};
        let control = 0;
        const fn = () => ++control;
        emitter.on(obj, fn);
        emitter.emit(obj);
        t.is(control, 1, 'trigger');
        emitter.emit(obj);
        t.is(control, 2, 'trigger');
        emitter.on(obj, fn);
        emitter.emit(obj);
        t.is(control, 3, 'trigger');
        t.end();
    });
    tape_1.default('once', t => {
        const emitter = weak_emitter_1.weakEmitter();
        const obj = {};
        let control = 0;
        emitter.once(obj, () => ++control);
        emitter.emit(obj);
        t.is(control, 1, 'trigger once');
        emitter.emit(obj);
        t.is(control, 1, 'automatic unsubscription');
        t.end();
    });
    tape_1.default('clear listener', t => {
        const emitter = weak_emitter_1.weakEmitter();
        const obj = {};
        let control = 0;
        emitter.on(obj, () => ++control);
        emitter.on(obj, () => ++control);
        emitter.emit(obj);
        t.is(control, 2, 'control');
        emitter.clear(obj);
        emitter.emit(obj);
        t.is(control, 2, 'remove link from subscriptions');
        t.end();
    });
    tape_1.default('off action', t => {
        const emitter = weak_emitter_1.weakEmitter();
        const obj = {};
        const control = {
            a: 0,
            b: 0
        };
        const fn = () => ++control.b;
        emitter.on(obj, () => ++control.a);
        emitter.on(obj, fn);
        emitter.emit(obj);
        t.is(control.a, 1, 'control a');
        t.is(control.b, 1, 'control b');
        emitter.off(obj, fn);
        emitter.emit(obj);
        t.is(control.a, 2, 'control a');
        t.is(control.b, 1, 'control b');
        t.end();
    });
    tape_1.default('emit actions in order', t => {
        const emitter = weak_emitter_1.weakEmitter();
        const obj = {};
        let control = '';
        emitter.on(obj, () => { control = control + 'a'; });
        emitter.emit(obj);
        t.is(control, 'a', 'trigger');
        emitter.emit(obj);
        t.is(control, 'aa', 'trigger');
        emitter.on(obj, () => { control = control + 'b'; });
        emitter.emit(obj);
        t.is(control, 'aaab', 'unsubscribe');
        emitter.on(obj, () => { control = control + 'c'; });
        emitter.emit(obj);
        t.is(control, 'aaababc', 'unsubscribe');
        t.end();
    });
    tape_1.default('emit with arguments', t => {
        const emitter = weak_emitter_1.weakEmitter();
        const obj = {};
        const control = {
            a: 0
        };
        emitter.on(obj, a => { control.a = a; });
        emitter.emit(obj, 1);
        t.is(control.a, 1);
        t.end();
    });
    tape_1.default('once in a event with muliple listeners', t => {
        const emitter = weak_emitter_1.weakEmitter();
        const out = [];
        const tt = {};
        emitter.on(tt, () => {
            out.push('uno');
        });
        emitter.once(tt, () => {
            out.push('a');
        });
        emitter.on(tt, () => {
            out.push('finish');
        });
        emitter.emit(tt);
        emitter.emit(tt);
        t.is(out[0], 'uno');
        t.is(out[1], 'a');
        t.is(out[2], 'finish');
        t.is(out[3], 'uno');
        t.is(out[4], 'finish');
        t.end();
    });
    tape_1.default('remove listener in a event with muliple listeners', t => {
        const emitter = weak_emitter_1.weakEmitter();
        const out = [];
        const tt = {};
        const f1 = () => out.push(1);
        const f3 = () => out.push(3);
        const f2 = () => {
            out.push(2);
            emitter.off(tt, f3);
        };
        emitter.on(tt, f1);
        emitter.on(tt, f2);
        emitter.on(tt, f3);
        emitter.emit(tt);
        t.is(out[0], 1);
        t.is(out[1], 2);
        t.notOk(out[2]);
        emitter.emit(tt);
        t.is(out[2], 1);
        t.is(out[3], 2);
        t.end();
    });
});
