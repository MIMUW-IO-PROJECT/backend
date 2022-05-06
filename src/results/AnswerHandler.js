const constants = require("../constants");

module.exports = {
  handle(answer, form, results) {
    console.log(`Handling answer: `, answer);
    for (let i = 0; i < form.questions.length; ++i) {
      const q = form.questions[i];
      const a = answer.answers[i];
      const r = results.results[i];

      switch (q.type) {
        case constants.SINGLE_ANS:
          handleClosedSingle(r, a);
          break;
        case constants.MULTI_ANS:
          handleClosedMulti(r, a);
          break;
        case constants.OPEN:
          handleOpen(r, a);
      }
    }
    return;
  },
};

function handleClosedSingle(results, answer) {
  results[answer] += 1;
  return;
}

function handleClosedMulti(results, answer) {
  answer.forEach((a) => {
    results[a] += 1;
  });
  return;
}

function handleOpen(results, answer) {
  results.push(answer);
  return;
}
