const assert = require('assert');
const FormValidator = require('../src/validators/FormValidator');

describe('Form Validation Test', () => {

    const validForm = {
        endDate: new Date(),
        questions: [
            {
                type: 'SINGLE',
                question: "Blah blah blah?",
                answers: [
                    "OK", "NOPE", "WHY?"
                ]
            },
            {
                type: 'MULTI',
                question: "Blah blah blah?",
                answers: [
                    "OK", "NOPE", "WHY?"
                ]
            },
            {  
                type: 'OPEN',
                question: "Blah blah blah?"
            }
        ]
    }

    it('should pass valid form', () => {
        assert(FormValidator.isValid(validForm));
    });

    it('should block form when endDate not set', () => {
        let form = JSON.parse(JSON.stringify(validForm));
        form.endDate = undefined;
        assert(!FormValidator.isValid(form));
    });

    it('should block form when no questions', () => {
        let form = JSON.parse(JSON.stringify(validForm));
        form.questions = [];
        assert(!FormValidator.isValid(form));
    });

});
