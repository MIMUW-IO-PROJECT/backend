const mongoose = require("mongoose");

/*
    Each schema maps to a MongoDB collection and defines the shape
    of the documents within that collection.
*/

const questionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['OPEN', 'MULTI', 'CLOSED'],
        required: true
    },
    question: {
        type: String,
    },
    answers: [String]
})

const Question = mongoose.model("Question", questionSchema);
module.exports.Question = Question;

//-----------------------------------------------------------

const formSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        default: Date.now,
    },
    questions: [questionSchema]
});


const Form = mongoose.model("Form", formSchema);
module.exports.Form = Form;