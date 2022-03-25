const assert = require("assert");
const samples = require("./samples");
const InMemoryFormRepo = require("./InMemoryRepo");
const FormAnswerValidator = require("../src/validators/FormAnswerValidator");

describe("Form Answer Validation Test", () => {
  before(() => {
    let formRepo = new InMemoryFormRepo();
    formRepo.save(samples.FORM);
    this.validator = new FormAnswerValidator(formRepo);
  });

  it("should pass valid answer form", () => {
    assert(this.validator.isValid(samples.ANS));
  });

  it("should block out of range closed single question answer", () => {
    let answer = JSON.parse(JSON.stringify(samples.ANS));
    answer.answers[0] = 5;
    assert(!this.validator.isValid(answer));
  });

  it("should block not integer closed single question answer", () => {
    let answer = JSON.parse(JSON.stringify(samples.ANS));
    answer.answers[0] = "INVALID";
    assert(!this.validator.isValid(answer));
  });

  it("should block out of range closed multi question answer", () => {
    let answer = JSON.parse(JSON.stringify(samples.ANS));
    answer.answers[1] = [1, 5, 6];
    assert(!this.validator.isValid(answer));
  });

  it("should block not array closed multi question answer", () => {
    let answer = JSON.parse(JSON.stringify(samples.ANS));
    answer.answers[1] = "INVALID";
    assert(!this.validator.isValid(answer));
  });
});
