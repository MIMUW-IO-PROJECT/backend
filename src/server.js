// To jest plik główny projektu.

// Wczytujemy zmienne z pliku .env.
const dotenv = require("dotenv").config();
if (dotenv.error) {
  console.log(dotenv.error);
}

const App = require("./App");
const SimpleController = require("./controllers/simpleController");

// Tutaj należy dodawać nowe kontrolery.
const controllers = [new SimpleController()];

const app = new App(controllers);

app.listen();
