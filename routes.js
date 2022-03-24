const express = require("express");
const userModel = require("./models");
const app = express();

// create the POST endpoint

// add new user data to database
app.post("/add_user", async (request, response) => {
    const user = new userModel(request.body);
  
    // save object to database
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});


// create the GET endpoint
// retrieve all the users saved
app.get("/users", async (request, response) => {
    // find() is used to retrieve the users
    const users = await userModel.find({});
  
    // 'send' users to this endpoint
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  // export these endpoints
  module.exports = app;