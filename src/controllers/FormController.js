const express = require("express");
const FormValidator = require("../validators/FormValidator");
const constants = require("../constants");
const models = require("../database/models");

module.exports = class FormController {
  constructor() {
    this.path = "/forms";
    this.router = express.Router();

    this.initializeRoutes();
    console.log("FormController initialized");
  }

  initializeRoutes() {
    this.router.post(`/forms`, this.post).get(`/forms/:id`, this.get);
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

  get = async (req, res) => {
    try {
      console.log(req.params);
      const f = await models.Form.findById(req.params.id).lean();
      res.send(f);
    } catch (err) {
      res.status(404).send();
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
  createEmptyResults(form) {
    let r = new models.Result({ formId: form._id, results: [] });

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
