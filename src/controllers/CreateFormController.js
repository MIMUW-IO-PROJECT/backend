const express = require("express");
const FormValidator = require("../validators/FormValidator");
const constants = require("../constants");
// eslint-disable-next-line no-unused-vars
const { default: mongoose } = require("mongoose");
const models = require("../database/models");

module.exports = class CreateFormController {
  constructor() {
    this.path = "/create";
    this.router = express.Router();

    this.initializeRoutes();
    console.log("CreateFormController initialized");
  }

  initializeRoutes() {
    this.router.route(this.path).post(this.post);
  }

  post = async (req, res) => {
    const form = this.getForm(req.body);

    if (FormValidator.isValid(form)) {
      await form.save();
      await this.createEmptyResults(form).save();
      console.log(`Form created:`, form);
      res.send(form);
    } else {
      console.log(`Form invalid:`, form);
      res.status(400).send("Invalid form!");
    }
  };

  /**
   * @returns {mongoose.Document}
   */
  getForm(form) {
    return new models.Form({
      endDate: form.endDate,
      questions: form.questions,
    });
  }

  /**
   * @returns {mongoose.Document}
   */
  createEmptyResults(form, formId) {
    let r = new models.Result({ formId: formId, results: [] });

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
