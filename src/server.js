const App = require("./App");
const CreateFormController = require("./controllers/CreateFormController");
const InMemoryFormRepo = require ("../test/InMemoryFormRepo");
const dotenv = require("dotenv");

// To jest plik główny projektu.

// Wczytujemy zmienne z pliku .env.
const config = dotenv.config;
if (config.error) {
  console.log(config.error);
}

// TODO: zamienić na mongo repo.
let repo = new InMemoryFormRepo();

// Tutaj należy dodawać nowe kontrolery.
const controllers = [new CreateFormController(repo)];

const app = new App(controllers);

app.listen();
