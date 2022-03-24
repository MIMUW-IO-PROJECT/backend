const express = require("express");
const FormValidator = require("../validators/FormValidator")

module.exports = class CreateFormController {
  constructor(formRepository) {
    this.path = "/create";
    this.router = express.Router();
    this.formRepository = formRepository;

    this.initializeRoutes();
    console.log("CreateFormController initialized");
  }

  initializeRoutes() {
    this.router
      .route(`${this.path}`)
      .post(this.post);
  }

  post = async (req, res) => {
    const form = this.getForm(req.body)
    
    console.log(req.body);
    console.log(form);

    if (FormValidator.isValid(form)) {
      const id = this.formRepository.save(form);
      res.send(id);
    } else {
      res.status(404).send('Invalid form!');
    }
  }

  getForm(form) {
    return {
      endDate: form.endDate,
      questions: form.questions
    }
  }

};
