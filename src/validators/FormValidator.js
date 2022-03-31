const ClosedQuestionValidator = require("./ClosedQuestionValidator");
const OpenQuestionValidator = require("./OpenQuestionValidator");
const validator = require("validator");
const constants = require("../constants");

class FormValidator {
  static isValid(form) {
    if (!form.endDate || !validator.isDate(form.endDate)) {
      return false;
    }

    if (
      !Array.isArray(form.questions) ||
      form.questions.length < constants.MIN_QUESTIONS_AMOUNT
    ) {
      return false;
    }

    for (let i = 0; i < form.questions.length; ++i) {
      const q = form.questions[i];
      if (
        !OpenQuestionValidator.isValid(q) &&
        !ClosedQuestionValidator.isValid(q)
      ) {
        return false;
      }
    }
    return true;
  }
}
module.exports = FormValidator;
