const assert = require("assert");

const CreateFormController = require("../src/controllers/CreateFormController");
const InMemoryFormRepo = require("./InMemoryRepo");

class MockResponse {
  constructor() {
    this.body = {};
  }

  send(id) {
    this.body.id = id;
  }
}

describe("CreateFormController test", () => {
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

  const validEmptyResults = {
    formId: 0,
    results: [[0, 0, 0], [0, 0, 0], []],
  };

  beforeEach(() => {
    this.repo = new InMemoryFormRepo();
    this.resultsRepo = new InMemoryFormRepo();
    this.api = new CreateFormController(this.repo, this.resultsRepo);
  });

  it("should save valid form", () => {
    let request = { body: validForm };
    let res = new MockResponse();

    this.api.post(request, res);

    assert.deepEqual(this.repo.get(res.body.id), validForm);
  });

  it("should block invalid form", () => {
    let request = {};
    let res = new MockResponse();

    this.api.post(request, res);

    assert(this.repo.isEmpty());
    assert(this.resultsRepo.isEmpty());
  });
});
