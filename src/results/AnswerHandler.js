module.exports = class AnswerHandler {

  constructor(resultsRepository) {
    this.repo = resultsRepository;
  }

  handle(answer) {
      // TODO
    console.log(`I am handling answer ${answer}`);
    return 1;
  }

};
