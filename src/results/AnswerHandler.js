const constants = require("../constants");

module.exports = class AnswerHandler {
  constructor(resultsRepository, formRepository) {
    this.repo = resultsRepository;
    this.formRepo = formRepository;
  }

  handle(answer) {
    const formId = answer.formId;
    const form = this.formRepo.get(formId);
    const results = this.repo.get(formId);

    console.log(`I am handling answer ${answer}`);

    for (let i = 0; i < form.questions.length; ++i) {
      const q = form.questions[i];
      const a = answer.answers[i];
      let r = results.results[i];

      if (q.type === constants.SINGLE_ANS) {
        this.handleClosedSingle(r, a);
      } else if (q.type === constants.MULTI_ANS) {
        this.handleClosedMulti(r, a);
      } else if (q.type === constants.OPEN) {
        this.handleOpen(r, a);
      }
    }
    this.repo.update(formId, results);
    return;
  }

  handleClosedSingle(results, answer) {
    results[answer] += 1;
    return;
  }

  handleClosedMulti(results, answer) {
    answer.forEach((a) => {
      results[a] += 1;
    });
    return;
  }

  handleOpen(results, answer) {
    results.push(answer);
    return;
  }
};
