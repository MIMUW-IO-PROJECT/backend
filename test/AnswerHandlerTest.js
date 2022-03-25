const assert = require("assert");
const AnswerHandler = require("../src/results/AnswerHandler");
const InMemoryFormRepo = require("./InMemoryRepo");

describe("AnswerHandler test", () => {
  const validForm = {
    endDate: new Date(),
    questions: [
      {
        type: "SINGLE",
        question: "Blah blah blah?",
        answers: ["OK", "NOPE", "WHY?"],
      },
      {
        type: "MULTI",
        question: "Blah blah blah?",
        answers: ["OK", "NOPE", "WHY?"],
      },
      {
        type: "OPEN",
        question: "Blah blah blah?",
      },
    ],
  };

  const validAnswer = {
    formId: 0,
    answers: [1, [1, 2, 0], "Why not?"],
  };

  const formResults = {
    formId: 0,
    results: [[0, 0, 0], [0, 0, 0], []],
  };

  beforeEach(() => {
    let formRepo = new InMemoryFormRepo();
    formRepo.save(validForm);

    this.resultsRepo = new InMemoryFormRepo();
    this.resultsRepo.save(formResults);

    this.handler = new AnswerHandler(this.resultsRepo, formRepo);
  });

  it("should handle valid answer", () => {
    this.handler.handle(validAnswer);
    const r = this.resultsRepo.get(validAnswer.formId);
    assert(r.results[0]);
  });
});
