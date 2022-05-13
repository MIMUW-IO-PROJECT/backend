const assert = require("assert");
const request = require("supertest");
const samples = require("../samples");

const AnswersController = require("../../src/controllers/AnswersController");
const FormController = require("../../src/controllers/FormController");
const ResultsController = require("../../src/controllers/ResultsController");
const App = require("../../src/App");

const { app } = new App([
  new AnswersController(),
  new FormController(),
  new ResultsController(),
]);

describe("Answer controller test", async () => {
  it("should save valid answer", async () => {
    const { _body: f } = await request(app)
      .post("/forms")
      .send(samples.FORM)
      .expect(200);

    let a = JSON.parse(JSON.stringify(samples.ANS));
    a.formId = f._id.toString();

    await request(app).post("/answer").send(a).expect(200);

    const { _body: actual } = await request(app)
      .get(`/results/${a.formId}`)
      .send()
      .expect(200);

    assert.deepEqual(actual.results, [[0, 1, 0], [1, 1, 1], ["Why not?"]]);
  });

  it("should reject answer to nonexisting form", async () => {
    let a = JSON.parse(JSON.stringify(samples.ANS));
    a.formId = -1;

    await request(app).post("/answer").send({ formId: -1 }).expect(404);
  });
});
