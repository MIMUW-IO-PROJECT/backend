const assert = require("assert");
const request = require("supertest");
const samples = require("../samples");
const models = require("../../src/database/models");

const CreateFormController = require("../../src/controllers/FormController");
const App = require("../../src/App");
const app = new App([new CreateFormController()]).app;

describe("Form controller test", async () => {
  it("should save valid form", async () => {
    const response = await request(app)
      .post("/forms")
      .send(samples.FORM)
      .expect(200);

    const f = await models.Form.findById(response.body._id, "-_id -__v").lean();

    assert.deepEqual(f, samples.FORM);
  });

  it("should block invalid form", async () => {
    await request(app).post("/forms").send({}).expect(400);
  });

  it("should block form when endDate not set", async () => {
    let form = JSON.parse(JSON.stringify(samples.FORM));
    form.endDate = undefined;
    await request(app).post("/forms").send(form).expect(400);
  });

  it("should block form when no questions", async () => {
    let form = JSON.parse(JSON.stringify(samples.FORM));
    form.questions = [];
    await request(app).post("/forms").send(form).expect(400);
  });

  it("should block invalid date", async () => {
    let form = JSON.parse(JSON.stringify(samples.FORM));
    form.endDate = "asdsda";
    await request(app).post("/forms").send(form).expect(400);
  });

  it("should respond with required form", async () => {
    const { _body: created } = await request(app)
      .post("/forms")
      .send(samples.FORM)
      .expect(200);

    const { _body: f } = await request(app)
      .get(`/forms/${created._id}`)
      .expect(200);

    console.log(f);
    assert.deepEqual(f.questions, samples.FORM.questions);
  });

  it("should return 404 when form not found", async () => {
    await request(app).get(`/forms/${0}`).expect(404);
  });
});
