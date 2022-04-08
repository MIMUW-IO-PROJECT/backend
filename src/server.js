const App = require("./App");
const CreateFormController = require("./controllers/CreateFormController");
const InMemoryRepo = require("../test/InMemoryRepo");
const dotenv = require("dotenv");
const SubmitAnswersController = require("./controllers/SubmitAnswersController");
const models = require("./database/models");

// To jest plik główny projektu.

// Wczytujemy zmienne z pliku .env.
const config = dotenv.config();
if (config.error) {
  console.log(config.error);
}

// TODO: zamienić na mongo
const formRepo = models.Form.collection;
const answerRepo = new InMemoryRepo();
const resultsRepo = models.Result.collection;

// Tutaj należy dodawać nowe kontrolery.
const controllers = [
  new CreateFormController(formRepo, resultsRepo),
  new SubmitAnswersController(formRepo, answerRepo, resultsRepo),
];

const app = new App(controllers);

app.listen();
