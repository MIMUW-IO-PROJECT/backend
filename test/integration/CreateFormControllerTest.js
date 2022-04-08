const assert = require("assert");
const request = require("supertest");
const samples = require("../samples");
const models = require("../../src/database/models");

const CreateFormController = require("../../src/controllers/CreateFormController");
const App = require("../../src/App");
const app = new App([new CreateFormController()]).app;

describe("Request test", async () => {
  it("should save valid form", async () => {
    const response = await request(app)
      .post("/create")
      .send(samples.FORM)
      .expect(200)
    
    const f = await models.Form
      .findById(response.body._id, '-_id -__v')
      .lean();
    
    assert.deepEqual(f, samples.FORM);
  });

  it("should block invalid form", async () => {
    await request(app)
      .post("/create")
      .send({})
      .expect(400);
  });
});
