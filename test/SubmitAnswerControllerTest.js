const assert = require('assert');
 
const InMemoryRepo = require('./InMemoryRepo');
const SubmitAnswersController = require('../src/controllers/SubmitAnswersController')

class MockResponse {
    constructor() {
        this.body = {};
    }

    send(id) {
        this.body.id = id;
    }
}

describe('SubmitAnswerRepository test', () => {

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

    beforeEach(() => {
        let formRepo = new InMemoryRepo();
        let answerRepo = new InMemoryRepo();

        formRepo.save(validForm);
        this.api = new SubmitAnswersController(formRepo, answerRepo);
    });
 
    it('should save valid answer', () => {
        let request = {body: validAnswer};
        let res = new MockResponse();

        this.api.post(request, res);
        
        assert.deepEqual(this.api.answerRepository.get(res.body.id), validAnswer);
    });

    it('should block invalid answer', () => {
        let answer = validAnswer;
        answer.answers[1] = [1, 5, 6];

        let request = {body: answer};
        let res = new MockResponse();

        this.api.post(request, res);
        
        assert(this.api.answerRepository.isEmpty());
    });
  
 
});