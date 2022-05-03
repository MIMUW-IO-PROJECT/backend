const assert = require("assert");
const ClosedQuestionValidator = require("../../src/validators/ClosedQuestionValidator");

describe("Closed question validation test", () => {
  const validClosedQuestion = {
    type: "SINGLE",
    question: "Blah blah blah?",
    answers: ["OK", "NOPE", "WHY?"],
  };

  it("should pass valid closed question", () => {
    assert(ClosedQuestionValidator.isValid(validClosedQuestion));
  });

  it("should block when type invalid", () => {
    let q = JSON.parse(JSON.stringify(validClosedQuestion));
    q.type = "INVALID_TYPE";
    assert(!ClosedQuestionValidator.isValid(q));
  });

  it("should block when question not set", () => {
    let q = JSON.parse(JSON.stringify(validClosedQuestion));
    q.question = undefined;
    assert(!ClosedQuestionValidator.isValid(q));
  });

  it("should block when not enough available answers", () => {
    let q = JSON.parse(JSON.stringify(validClosedQuestion));
    q.answers = ["A"];
    assert(!ClosedQuestionValidator.isValid(q));
  });
});
