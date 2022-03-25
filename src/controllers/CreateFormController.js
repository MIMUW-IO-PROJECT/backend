const express = require("express");
const FormValidator = require("../validators/FormValidator");

module.exports = class CreateFormController {
  constructor(formRepository) {
    this.path = "/create";
    this.router = express.Router();
    this.formRepository = formRepository;

    this.initializeRoutes();
    console.log("CreateFormController initialized");
  }

  initializeRoutes() {
    this.router.route(`${this.path}`).post(this.post);
  }

  post = async (req, res) => {
    const form = this.getForm(req.body);

    if (FormValidator.isValid(form)) {
      const id = this.formRepository.save(form);
      console.log(`Form created ${form}`);
      res.send(id);
    } else {
      console.log(`Form invalid ${form}`);
      res.status(404).send("Invalid form!");
    }
  };

  getForm(form) {
    return {
      endDate: form.endDate,
      questions: form.questions,
    };
  }
};
