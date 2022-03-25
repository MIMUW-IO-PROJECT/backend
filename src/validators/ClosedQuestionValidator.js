const constants = require("../constants");

class ClosedQuestionValidator {
  static isValid(question) {
    return (
      question.question &&
      [constants.SINGLE_ANS, constants.MULTI_ANS].includes(question.type) &&
      Array.isArray(question.answers) &&
      question.answers.length >= constants.MIN_ANSWERS_AMOUNT
    );
  }
}

module.exports = ClosedQuestionValidator;
