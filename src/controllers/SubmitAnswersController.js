const express = require("express");
const AnswerHandler = require("../results/AnswerHandler");
const FormAnswerValidator = require("../validators/FormAnswerValidator");

module.exports = class SubmitAnswersController {
  constructor(formRepository, answerRepository, resultsRepository) {
    this.path = "/answer";
    this.router = express.Router();

    this.answerRepository = answerRepository;
    this.validator = new FormAnswerValidator(formRepository);
    this.answerHandler = new AnswerHandler(resultsRepository, formRepository);

    this.initializeRoutes();
    console.log("SubmitAnswersController initialized.");
  }

  initializeRoutes() {
    this.router.route(this.path).post(this.post);
  }

  post = async (req, res) => {
    const answer = this.getAnswer(req.body);

    if (this.validator.isValid(answer)) {
      const id = await this.answerRepository.save(answer);
      await this.answerHandler.handle(answer);
      res.send(id);
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
