const express = require("express");
const AnswerHandler = require("../results/AnswerHandler");
const FormAnswerValidator = require("../validators/FormAnswerValidator");
const { Form, Result } = require("../database/models");

module.exports = class AnswersController {
  constructor() {
    this.path = "/answer";
    this.router = express.Router();

    this.initializeRoutes();
    console.log("AnswersController initialized.");
  }

  initializeRoutes() {
    this.router.route(this.path).post(this.post);
  }
  post = async (req, res) => {
    const answer = req.body;
    let form, results;

    try {
      form = await Form.findById(answer.formId).lean();
      results = await Result.findOne({ formId: answer.formId });
    } catch (err) {
      res.status(404).send();
      return;
    }

    if (!FormAnswerValidator.isValid(answer, form)) {
      res.status(400).send();
      return;
    }

    AnswerHandler.handle(answer, form, results);

    results.markModified("results");
    await results.save();
    res.send();
  };
};
