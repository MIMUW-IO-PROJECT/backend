const assert = require('assert');
const ClosedQuestionValidator = require('../src/validators/ClosedQuestionValidator');
const constants = require('../src/constants')

describe('Closed question validation test', () => {

    const validClosedQuestion = {
        type: 'SINGLE',
        question: "Blah blah blah?",
        answers: [
            "OK", "NOPE", "WHY?"
        ]
    }

    it('should pass valid closed question', () => {
        assert(ClosedQuestionValidator.isValid(validClosedQuestion));
    });

    it('should block when type invalid', () => {
        let q = validClosedQuestion;
        q.type = "INVALID_TYPE";
        assert(!ClosedQuestionValidator.isValid(q));
    });

    it('should block when question not set', () => {
        let q = validClosedQuestion;
        q.question = undefined;
        assert(!ClosedQuestionValidator.isValid(q));
    });

    it('should block when not enough available answers', () => {
        let q = validClosedQuestion;
        q.answers = ["A"];
        assert(!ClosedQuestionValidator.isValid(q));
    });

});
