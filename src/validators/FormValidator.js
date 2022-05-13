const ClosedQuestionValidator = require("./ClosedQuestionValidator");
const OpenQuestionValidator = require("./OpenQuestionValidator");
const constants = require("../constants");

class FormValidator {
  static isValid(questions) {
    if (questions.length < constants.MIN_QUESTIONS_AMOUNT) {
      return false;
    }

    for (let i = 0; i < questions.length; ++i) {
      const q = questions[i];
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
