import {
  assertMatch,
  assertStrictEquals,
} from "https://deno.land/std@0.105.0/testing/asserts.ts";
import { encodeOAuthUri } from "./encode.ts";

Deno.test("Function 'encodeOAuthUri' works", () => {
  assertMatch(encodeOAuthUri("Hello!"), /%21/);
  assertMatch(encodeOAuthUri("I'm Deno"), /%27/);
  assertMatch(encodeOAuthUri("(JS, TS Runtime build with v8)"), /%28/);
  assertStrictEquals(encodeOAuthUri("=*#"), "%3D%2A%23");
});
