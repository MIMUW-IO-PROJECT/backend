const assert = require("assert");
const samples = require("../samples");
const AnswerHandler = require("../../src/results/AnswerHandler");

describe("Answer Handler Test", () => {
  it("Should update sample results", () => {
    let res = JSON.parse(JSON.stringify(samples.RES));
    let expected = {
      formId: 0,
      results: [[0, 1, 0], [1, 1, 1], ["Why not?"]],
    };
    AnswerHandler.handle(samples.ANS, samples.FORM, res);
    assert.deepEqual(res, expected);
  });
});
