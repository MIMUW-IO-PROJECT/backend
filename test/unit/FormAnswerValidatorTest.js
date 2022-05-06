const assert = require("assert");
const samples = require("../samples");
const FormAnswerValidator = require("../../src/validators/FormAnswerValidator");

describe("Form Answer Validation Test", () => {
  it("should pass valid answer form", () => {
    assert(FormAnswerValidator.isValid(samples.ANS, samples.FORM));
  });

  it("should block out of range closed single question answer", () => {
    let answer = JSON.parse(JSON.stringify(samples.ANS));
    answer.answers[0] = 5;
    assert(!FormAnswerValidator.isValid(answer, samples.FORM));
  });

  it("should block not integer closed single question answer", () => {
    let answer = JSON.parse(JSON.stringify(samples.ANS));
    answer.answers[0] = "INVALID";
    assert(!FormAnswerValidator.isValid(answer, samples.FORM));
  });

  it("should block out of range closed multi question answer", () => {
    let answer = JSON.parse(JSON.stringify(samples.ANS));
    answer.answers[1] = [1, 5, 6];
    assert(!FormAnswerValidator.isValid(answer, samples.FORM));
  });

  it("should block not array closed multi question answer", () => {
    let answer = JSON.parse(JSON.stringify(samples.ANS));
    answer.answers[1] = "INVALID";
    assert(!FormAnswerValidator.isValid(answer, samples.FORM));
  });
});
