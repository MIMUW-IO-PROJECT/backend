const assert = require("assert");
const samples = require("../samples");
const FormValidator = require("../../src/validators/FormValidator");

describe("Form Validation Test", () => {
  it("should pass valid form", () => {
    assert(FormValidator.isValid(samples.FORM));
  });

  it("should block form when endDate not set", () => {
    let form = JSON.parse(JSON.stringify(samples.FORM));
    form.endDate = undefined;
    assert(!FormValidator.isValid(form));
  });

  it("should block form when no questions", () => {
    let form = JSON.parse(JSON.stringify(samples.FORM));
    form.questions = [];
    assert(!FormValidator.isValid(form));
  });

  it("should block invalid date", () => {
    let form = JSON.parse(JSON.stringify(samples.FORM));
    form.endDate = "asdsda";
    assert(FormValidator.isValid(samples.FORM));
  });
});
