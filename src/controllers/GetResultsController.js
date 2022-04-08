const express = require("express");
const models = require("../database/models");

module.exports = class GetResultsController {
  /**
   * @param {mongoose.Collection} resultsRepository
   */
  constructor() {
    this.path = "/results";
    this.router = express.Router();

    this.initializeRoutes();
    console.log("GetResultsController initialized.");
  }

  initializeRoutes() {
    this.router.route(this.path).get(this.get);
  }

  get = async (req, res) => {
    let results = await models.Result.findOne({
      formId: req.body.formId,
    }).lean();
    if (results !== null) {
      res.send(results);
    } else {
      res.status(404).send();
    }
  };
};
