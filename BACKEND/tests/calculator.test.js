import test from "node:test";
import assert from "node:assert/strict";

import { calculate } from "../controllers/calculator.controller.js";

function createResponse() {
  return {
    statusCode: null,
    payload: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.payload = body;
      return this;
    },
  };
}

test("returns a result for valid expressions", () => {
  const req = { body: { expression: "2 + 2" } };
  const res = createResponse();

  calculate(req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.payload.success, true);
  assert.equal(res.payload.result, 4);
});

test("rejects undefined results such as division by zero", () => {
  const req = { body: { expression: "1 / 0" } };
  const res = createResponse();

  calculate(req, res);

  assert.equal(res.statusCode, 400);
  assert.equal(res.payload.success, false);
  assert.match(res.payload.message, /Invalid Expression|undefined/i);
});
