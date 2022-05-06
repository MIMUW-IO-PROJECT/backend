const express = require("express");
const models = require("../database/models");

module.exports = class ResultsController {
  /**
   * @param {mongoose.Collection} resultsRepository
   */
  constructor() {
    this.path = "/results";
    this.router = express.Router();

    this.initializeRoutes();
    console.log("ResultsController initialized.");
  }

  initializeRoutes() {
    this.router.get("/results/:formId", this.get);
  }

  get = async (req, res) => {
    let results = await models.Result.findOne({
      formId: req.params.formId,
    }).lean();
    if (results !== null) {
      res.send(results);
    } else {
      res.status(404).send();
    }
  };
};
