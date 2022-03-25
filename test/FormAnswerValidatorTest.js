const assert = require('assert');
const InMemoryFormRepo = require('./InMemoryRepo');
const FormAnswerValidator = require('../src/validators/FormAnswerValidator');

describe('Form Answer Validation Test', () => {

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

    const validAnswer = {
        formId: 0,
        answers: [
            1,
            [1, 2, 0],
            "Why not?"
        ]
    }

    before(() => {
        let formRepo = new InMemoryFormRepo();
        formRepo.save(validForm);
        this.validator = new FormAnswerValidator(formRepo);
    })

    it('should pass valid answer form', () => {
        assert(this.validator.isValid(validAnswer));
    });

    it('should block out of range closed single question answer', () => {
        let answer = JSON.parse(JSON.stringify(validAnswer));
        answer.answers[0] = 5;
        assert(!this.validator.isValid(answer));
    });

    it('should block not integer closed single question answer', () => {
        let answer = JSON.parse(JSON.stringify(validAnswer));
        answer.answers[0] = "INVALID";
        assert(!this.validator.isValid(answer));
    });

    it('should block out of range closed multi question answer', () => {
        let answer = JSON.parse(JSON.stringify(validAnswer));
        answer.answers[1] = [1, 5, 6];
        assert(!this.validator.isValid(answer));
    });

    it('should block not array closed multi question answer', () => {
        let answer = JSON.parse(JSON.stringify(validAnswer));
        answer.answers[1] = "INVALID";
        assert(!this.validator.isValid(answer));
    });

});
