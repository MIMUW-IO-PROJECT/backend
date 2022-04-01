const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  formId: {
    type: String,
  },
  results: [[String]],
});

const Result = mongoose.model("Result", resultSchema);
module.exports = { Result };
