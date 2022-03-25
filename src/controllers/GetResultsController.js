const express = require("express");

module.exports = class GetResultsController {

  constructor(resultsRepository) {
    this.path = "/results";
    this.router = express.Router();

    this.repo = resultsRepository;

    this.initializeRoutes();
    console.log("GetResultsController initialized");
  }

  initializeRoutes() {
    this.router
      .route(`${this.path}`)
      .get(this.get);
  }

  post = async (req, res) => {
    const formId = req.body.id;

    if (this.repo.contains(formId)) {
      res.send(this.repo.get(formId));
    } else {
      res.status(404).send(`Form ${formId} does not exist.`);
    }
  }

};
