import { weakEmitter } from "./weak-emitter.ts";
import { assertEquals, assertFalse, fail } from "@std/assert";

Deno.test("on and emit", () => {
  const emitter = weakEmitter();
  const obj = {};
  let control = 0;
  const fn = () => ++control;
  emitter.on(obj, obj, fn);
  emitter.emit(obj, obj);
  assertEquals(control, 1, "trigger");
  emitter.emit(obj, obj);
  assertEquals(control, 2, "trigger");
  emitter.on(obj, obj, fn);
  emitter.emit(obj, obj);
  assertEquals(control, 3, "trigger");
});

Deno.test("off action", () => {
  const emitter = weakEmitter();
  const obj = {};
  const control = {
    a: 0,
    b: 0,
  };
  const fn = () => ++control.b;
  emitter.on(obj, obj, () => ++control.a);
  emitter.on(obj, obj, fn);
  emitter.emit(obj, obj);
  assertEquals(control.a, 1, "control a");
  assertEquals(control.b, 1, "control b");
  emitter.off(obj, obj, fn);
  emitter.emit(obj, obj);
  assertEquals(control.a, 2, "control a");
  assertEquals(control.b, 1, "control b");
});

Deno.test("eventController#emit", () => {
  const ee = weakEmitter();
  const obj = {};
  const event = ee.on(obj, "a", (...change) => {
    assertEquals(change, [1, 2, 3, 4]);
  });
  event.emit(1, 2, 3, 4);
});

Deno.test("eventController#off", () => {
  const ee = weakEmitter();
  const obj = {};
  const event = ee.on(obj, "a", () => {
    fail();
  });
  event.off();
  ee.emit(obj, "a");
});

Deno.test("eventController#transfer", () => {
  const ee = weakEmitter();
  const pass = () => 1;
  const failure = () => fail();
  const control = {
    action: pass,
  };
  const obj = {};
  const dest = {};
  const event = ee.on(obj, "a", () => {
    control.action();
  });

  event.transfer(dest);
  ee.emit(dest, "a");

  control.action = failure;
  ee.emit(obj, "a");

  event.off();
  ee.emit(dest, "a");
});

Deno.test("emit actions in order", () => {
  const emitter = weakEmitter();
  const obj = {};
  let control = "";
  emitter.on(obj, obj, () => {
    control = control + "a";
  });
  emitter.emit(obj, obj);
  assertEquals(control, "a", "trigger");
  emitter.emit(obj, obj);
  assertEquals(control, "aa", "trigger");

  emitter.on(obj, obj, () => {
    control = control + "b";
  });
  emitter.emit(obj, obj);
  assertEquals(control, "aaab", "unsubscribe");

  emitter.on(obj, obj, () => {
    control = control + "c";
  });
  emitter.emit(obj, obj);
  assertEquals(control, "aaababc", "unsubscribe");
});

Deno.test("emit with arguments", () => {
  const emitter = weakEmitter();
  const obj = {};
  const control = {
    a: 0,
  };
  emitter.on(obj, obj, (a) => {
    control.a = a;
  });

  emitter.emit(obj, obj, 1);
  assertEquals(control.a, 1);
});

Deno.test("remove listener in a event with muliple listeners", () => {
  const emitter = weakEmitter();
  const out: number[] = [];
  const tt = {};
  const f1 = () => out.push(1);
  const f3 = () => out.push(3);
  const f2 = () => {
    out.push(2);
    emitter.off(tt, tt, f3);
  };
  emitter.on(tt, tt, f1);
  emitter.on(tt, tt, f2);
  emitter.on(tt, tt, f3);
  emitter.emit(tt, tt);
  assertEquals(out[0], 1);
  assertEquals(out[1], 2);
  assertFalse(out[2]);
  emitter.emit(tt, tt);
  assertEquals(out[2], 1);
  assertEquals(out[3], 2);
});
