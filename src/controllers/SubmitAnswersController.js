const express = require("express");
const AnswerHandler = require("../results/AnswerHandler");
const FormAnswerValidator = require("../validators/FormAnswerValidator");
const models = require("../../src/database/models");

module.exports = class SubmitAnswersController {
  constructor() {
    this.path = "/answer";
    this.router = express.Router();

    this.validator = new FormAnswerValidator();
    this.answerHandler = new AnswerHandler();

    this.initializeRoutes();
    console.log("SubmitAnswersController initialized.");
  }

  initializeRoutes() {
    this.router.route(this.path).post(this.post);
  }

  post = async (req, res) => {
    const answer = this.getAnswer(req.body);
    const form = await models.Form.findById(answer.formId).lean();
    if (this.validator.isValid(answer, form)) {
      await this.answerHandler.handle(answer);
      res.send("OK");
    } else {
      res.status(404).send("Invalid answer!");
    }
  };

  getAnswer(answer) {
    return {
      formId: answer.formId,
      answers: answer.answers,
    };
  }
};
