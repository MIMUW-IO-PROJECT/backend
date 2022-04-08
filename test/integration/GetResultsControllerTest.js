const assert = require("assert");
const request = require("supertest");
const samples = require("../samples");
const models = require("../../src/database/models");

const GetResultsController = require("../../src/controllers/GetResultsController");
const App = require("../../src/App");
const app = new App([new GetResultsController()]).app;

describe("Request test", async () => {
  it("should get results", async () => {
    const res = await new models.Result(samples.RES).save();

    const response = await request(app)
      .get("/results")
      .send({formId: res.formId})
      .expect(200)
    
    assert.deepEqual(response.body.formId, samples.RES.formId);
    assert.deepEqual(response.body.results, samples.RES.results);
  });

  it("should block invalid form", async () => {
    await request(app)
      .get("/results")
      .send({})
      .expect(404);
  });
});
