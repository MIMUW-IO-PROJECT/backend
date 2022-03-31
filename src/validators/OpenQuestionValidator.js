const constants = require("../constants");

class OpenQuestionValidator {
  static isValid(question) {
    return question && question.question && question.type === constants.OPEN;
  }
}

module.exports = OpenQuestionValidator;
