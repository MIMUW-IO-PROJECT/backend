const assert = require("assert");
const samples = require("./samples");
const InMemoryRepo = require("./InMemoryRepo");
const SubmitAnswersController = require("../src/controllers/SubmitAnswersController");

class MockResponse {
  constructor() {
    this.body = {};
  }

  send(id) {
    this.body.id = id;
  }
}

describe("SubmitAnswerController test", () => {
  beforeEach(() => {
    let formRepo = new InMemoryRepo();
    let answerRepo = new InMemoryRepo();
    let resultsRepo = new InMemoryRepo();

    formRepo.save(samples.FORM);
    resultsRepo.save(samples.RES);
    this.api = new SubmitAnswersController(formRepo, answerRepo, resultsRepo);
  });

  it("should save valid answer", async () => {
    let answer = JSON.parse(JSON.stringify(samples.ANS));
    let request = { body: answer };
    let res = new MockResponse();

    await this.api.post(request, res);

    assert.deepEqual(this.api.answerRepository.get(res.body.id), samples.ANS);
  });

  it("should block invalid answer", () => {
    let answer = JSON.parse(JSON.stringify(samples.ANS));
    answer.answers[1] = [1, 5, 6];

    let request = { body: answer };
    let res = new MockResponse();

    this.api.post(request, res);

    assert(this.api.answerRepository.isEmpty());
  });
});
