const express = require("express");
const cors = require("cors");

class App {
  constructor(controllers) {
    this.app = express();
    this.port = parseInt(process.env.PORT) || 5000;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is listening on the port ${this.port}.`);
    });
  }
}

module.exports = App;
