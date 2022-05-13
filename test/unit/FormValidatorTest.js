const assert = require("assert");
const samples = require("../samples");
const FormValidator = require("../../src/validators/FormValidator");

describe("Form Validation Test", () => {
  it("should pass valid form", () => {
    assert(FormValidator.isValid(samples.FORM.questions));
  });

  it("should block form when no questions", () => {
    let form = JSON.parse(JSON.stringify(samples.FORM));
    form.questions = [];
    assert(!FormValidator.isValid(form.questions));
  });
});
