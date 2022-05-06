const assert = require("assert");
const OpenQuestionValidator = require("../../src/validators/OpenQuestionValidator");

describe("Open question validation test", () => {
  const validOpenQuestion = {
    type: "OPEN",
    question: "Blah blah blah?",
  };

  it("should pass valid open question", () => {
    assert(OpenQuestionValidator.isValid(validOpenQuestion));
  });

  it("should block when type invalid", () => {
    let q = JSON.parse(JSON.stringify(validOpenQuestion));
    q.type = "INVALID_TYPE";
    assert(!OpenQuestionValidator.isValid(q));
  });

  it("should block when question not set", () => {
    let q = JSON.parse(JSON.stringify(validOpenQuestion));
    q.question = undefined;
    assert(!OpenQuestionValidator.isValid(q));
  });
});
