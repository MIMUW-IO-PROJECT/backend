const express = require("express");
const FormAnswerValidator = require("../validators/FormAnswerValidator");

module.exports = class SubmitAnswersController {

  constructor(formRepository, answerRepository) {
    this.path = "/answer";
    this.router = express.Router();

    this.answerRepository = answerRepository;
    this.validator = new FormAnswerValidator(formRepository);

    this.initializeRoutes();
    console.log("SubmitAnswersController initialized");
  }

  initializeRoutes() {
    this.router
      .route(`${this.path}`)
      .post(this.post);
  }

  post = async (req, res) => {
    const answer = this.getAnswer(req.body)

    if (this.validator.isValid(answer)) {
      const id = this.answerRepository.save(answer);
      res.send(id);
    } else {
      res.status(404).send('Invalid answer!');
    }
  }

  getAnswer(answer) {
    return {
      formId: answer.formId,
      answers: answer.answers
    }
  }

};
