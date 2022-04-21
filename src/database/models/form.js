const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["OPEN", "MULTI", "SINGLE"],
    required: true,
  },
  question: {
    type: String,
  },
  answers: [String],
});

const Question = mongoose.model("Question", questionSchema);

const formSchema = new mongoose.Schema({
  endDate: {
    type: Date,
    default: Date.now,
  },
  questions: [questionSchema],
});

const Form = mongoose.model("Form", formSchema);
module.exports = { Question, Form };
