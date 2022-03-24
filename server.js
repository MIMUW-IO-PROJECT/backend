const express = require('express');
const mongoose = require('mongoose');
const Router = require("./routes");
const models = require("./models");


const app = express();
app.use(express.json());

mongoose.connect(
    "mongodb+srv://mimuw_ankiety:kFGwWu8AdA9XrQaj@ankiety.yjzin.mongodb.net/ankiety?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});





const pizzaPreferencje = new models.Question({
  type: "OPEN",
  question: "Jaką najbardziej lubisz pizzę?"
})

const pizzaKiedy = new models.Question({
  type: "CLOSED",
  question: "Kiedy masz czas wyjść na pizzę?",
  answers: ["W piątek", "W weekend", "czemu by nie dzisiaj"]
})

const pizzaRodzaj = new models.Question({
  type: "MULTI",
  question: "A z tych pizz które byś zjadł?",
  answers: ["hawajska", "salami boczek", "capriciosa", "wegetariańska"]
})


// const ankietaPizza = new formModel({
//   id: 123123,
//   endDate: 2022-03-26,
//   questions: [
//     {
//       type: "OPEN",
//       question: "Jaką najbardziej lubisz pizzę?"
//     },
//     {
//       type: "CLOSED",
//       question: "Kiedy masz czas wyjść na pizzę?",
//       answers: ["W piątek", "W weekend", "czemu by nie dzisiaj"]
//     },
//     {
//       type: "MULTI",
//       question: "A z tych pizz które byś zjadł?",
//       answers: ["hawajska", "salami boczek", "capriciosa", "wegetariańska"]
//     }
//   ]
// })


const ankietaPizza = new models.Form({
  id: 123123,
  endDate: 2022-03-26,
  questions: [
    pizzaPreferencje,
    pizzaKiedy,
    pizzaRodzaj
  ]
})

console.log(ankietaPizza.questions[1]);


// ankietaPizza.questions.push(pizzaPreferencje);
// ankietaPizza.questions.push(pizzaKiedy);
// ankietaPizza.questions.push(pizzaRodzaj);

console.log(ankietaPizza);

ankietaPizza.save(function (err) {
  if (err) console.log(err.message);
  console.log("saved to database");
});



// formModel.deleteOne({ id: 123123 }, function (err) {
//   if (err) return handleError(err);
//   console.log("Deleted one pizza form");
// });