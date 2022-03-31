const constants = require("../constants");

module.exports = class AnswerHandler {
  constructor(resultsRepository, formRepository) {
    this.resultRepo = resultsRepository;
    this.formRepo = formRepository;
  }

  async handle(answer) {
    const formId = answer.formId;
    const form = await this.formRepo.get(formId);
    const results = await this.resultRepo.get(formId);

    console.log(`Handling answer: `, answer);

    for (let i = 0; i < form.questions.length; ++i) {
      const q = form.questions[i];
      const a = answer.answers[i];
      const r = results.results[i];

      if (q.type === constants.SINGLE_ANS) {
        this.handleClosedSingle(r, a);
      } else if (q.type === constants.MULTI_ANS) {
        this.handleClosedMulti(r, a);
      } else if (q.type === constants.OPEN) {
        this.handleOpen(r, a);
      }
    }
    await this.resultRepo.update(formId, results);
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
