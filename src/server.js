const App = require("./App");
const CreateFormController = require("./controllers/FormController");
const dotenv = require("dotenv");
const SubmitAnswersController = require("./controllers/AnswersController");
const GetResultsController = require("./controllers/ResultsController");
const Database = require("./database/Database");

// To jest plik główny projektu.

// Wczytujemy zmienne z pliku .env.
const config = dotenv.config();
if (config.error) {
  console.log(config.error);
}

Database.connect();

// Tutaj należy dodawać nowe kontrolery.
const controllers = [
  new CreateFormController(),
  new SubmitAnswersController(),
  new GetResultsController(),
];

const app = new App(controllers);

app.listen();
