const constants = require("../constants");

class FormAnswerValidator {
  constructor(formRepo) {
    this.repo = formRepo;
  }

  isValid(answer) {
    console.log(`validating answer:`, answer);

    if (!this.repo.contains(answer.formId)) {
      console.log("Form not found", answer.formId);
      return false;
    }

    const form = this.repo.get(answer.formId);
    let res = true;

    for (let i = 0; i < form.questions.length; ++i) {
      const q = form.questions[i];
      const a = answer.answers[i];

      if (q.type === constants.SINGLE_ANS) {
        res &= this.isValidAnswerToClosedSingleQuestion(q, a);
      } else if (q.type === constants.MULTI_ANS) {
        res &= this.isValidAnswerToClosedMultiQuestion(q, a);
      } else if (q.type === constants.OPEN) {
        res &= this.isValidAnswerToOpenQuestion(q, a);
      } else {
        res = false;
      }
    }
    return res;
  }

  isValidAnswerToClosedSingleQuestion(question, answer) {
    const numAnswers = question.answers.length;
    return Number.isInteger(answer) && 0 <= answer && answer < numAnswers;
  }

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
  }

  isValidAnswerToOpenQuestion() {
    return true;
  }
}
module.exports = FormAnswerValidator;
