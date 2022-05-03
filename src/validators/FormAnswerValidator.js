const constants = require("../constants");

module.exports = {
  isValid(answer, form) {
    console.log(`validating answer:`, answer);

    let res = true;
    for (let i = 0; i < form.questions.length; ++i) {
      const q = form.questions[i];
      const a = answer.answers[i];

      switch (q.type) {
        case constants.SINGLE_ANS:
          res &= this.isValidAnswerToClosedSingleQuestion(q, a);
          break;
        case constants.MULTI_ANS:
          res &= this.isValidAnswerToClosedMultiQuestion(q, a);
          break;
        case constants.OPEN:
          break;
        default:
          res = false;
      }
    }
    return res;
  },

  isValidAnswerToClosedSingleQuestion(question, answer) {
    const numAnswers = question.answers.length;
    return Number.isInteger(answer) && 0 <= answer && answer < numAnswers;
  },

  isValidAnswerToClosedMultiQuestion(question, answer) {
    if (!Array.isArray(answer)) {
      return false;
    }
    answer.sort();

    const numAnswers = question.answers.length;
    const uniqueAnswersInRange = [
      ...new Set(
        answer.filter((v) =>
          this.isValidAnswerToClosedSingleQuestion(question, v)
        )
      ),
    ];
    for (let i = 0; i < numAnswers; ++i) {
      if (answer[i] !== uniqueAnswersInRange[i]) {
        return false;
      }
    }
    return true;
  },
};
