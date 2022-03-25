const assert = require("assert");
const AnswerHandler = require("../src/results/AnswerHandler");
const InMemoryFormRepo = require("./InMemoryRepo");
const samples = require("./samples");

describe("AnswerHandler test", () => {
  beforeEach(() => {
    let formRepo = new InMemoryFormRepo();
    formRepo.save(samples.FORM);

    this.resultsRepo = new InMemoryFormRepo();
    this.resultsRepo.save(samples.RES);

    this.handler = new AnswerHandler(this.resultsRepo, formRepo);
  });

  it("should handle valid answer", () => {
    this.handler.handle(samples.ANS);
    const r = this.resultsRepo.get(samples.ANS.formId);
    assert(r.results[0]);
  });
});
