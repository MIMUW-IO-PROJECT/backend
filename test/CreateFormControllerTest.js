const assert = require("assert");
const samples = require("./samples");
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
  beforeEach(() => {
    this.repo = new InMemoryFormRepo();
    this.resultsRepo = new InMemoryFormRepo();
    this.api = new CreateFormController(this.repo, this.resultsRepo);
  });

  it("should save valid form", async () => {
    let request = { body: { form: samples.FORM } };
    let res = new MockResponse();

    await this.api.post(request, res);

    assert.deepEqual(this.repo.get(Number(res.body.id)), samples.FORM);
  });

  it("should block invalid form", () => {
    let request = {};
    let res = new MockResponse();

    this.api.post(request, res);

    assert(this.repo.isEmpty());
    assert(this.resultsRepo.isEmpty());
  });
});
