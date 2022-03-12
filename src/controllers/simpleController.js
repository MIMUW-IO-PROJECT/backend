const express = require("express");

module.exports = class SimpleController {
  constructor() {
    this.path = "/test";
    this.router = express.Router();

    this.initializeRoutes();
    console.log("simpleController initialized");
  }

  initializeRoutes() {
    this.router
      .route(`${this.path}/:elementId`)
      .get(this.simpleGet)
      .post(this.simplePost);
  }

  simpleGet = async (req, res) => {
    console.log(req.params["elementId"]);
    res.send(
      `backend recived GET request with param = '${req.params["elementId"]}' and sent this response.`
    );
  };

  simplePost = async (req, res) => {
    console.log(req.params["elementId"]);
    console.log(req.body);
    res.send(
      `backend recived POST request with param = '${
        req.params["elementId"]
      }' and body = ${JSON.stringify(req.body)} and sent this response.`
    );
  };
};
