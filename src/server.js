const App = require("./App");
const CreateFormController = require("./controllers/CreateFormController");
const InMemoryRepo = require ("../test/InMemoryRepo");
const dotenv = require("dotenv");
const SubmitAnswersController = require("./controllers/SubmitAnswersController");

// To jest plik główny projektu.

// Wczytujemy zmienne z pliku .env.
const config = dotenv.config();
if (config.error) {
  console.log(config.error);
}

// TODO: zamienić na mongo
let formRepo = new InMemoryRepo();
let answerRepo = new InMemoryRepo();

// Tutaj należy dodawać nowe kontrolery.
const controllers = [
  new CreateFormController(formRepo),
  new SubmitAnswersController(formRepo, answerRepo)
];

const app = new App(controllers);

app.listen();
