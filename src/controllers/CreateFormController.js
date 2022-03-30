const express = require("express");
const FormValidator = require("../validators/FormValidator");
const constants = require("../constants");

module.exports = class CreateFormController {
  constructor(formRepository, resultsRepostitory) {
    this.path = "/create";
    this.router = express.Router();
    this.formRepo = formRepository;
    this.resultsRepo = resultsRepostitory;

    this.initializeRoutes();
    console.log("CreateFormController initialized");
  }

  initializeRoutes() {
    this.router.route(this.path).post(this.post);
  }

  post = async (req, res) => {
    const form = this.getForm(req.body);

    if (FormValidator.isValid(form)) {
      const id = await this.formRepo.save(form);
      await this.resultsRepo.save(this.createEmptyResults(form, id));
      console.log(`Form created:`, form);
      res.send(id);
    } else {
      console.log(`Form invalid:`, form);
      res.status(404).send("Invalid form!");
    }
  };

  getForm(form) {
    return {
      endDate: form.endDate,
      questions: form.questions,
    };
  }

  createEmptyResults(form, formId) {
    let r = { formId: formId, results: [] };
    form.questions.forEach((q) => {
      if (q.type === constants.SINGLE_ANS || q.type === constants.MULTI_ANS) {
        r.results.push(Array(q.answers.length).fill(0));
      } else {
        r.results.push(Array());
      }
    });
    return r;
  }
};
