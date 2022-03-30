/*
  Klasa Database udostępnia statyczną metodę connect.
*/

const mongoose = require("mongoose");

require("dotenv").config();

class Database {
  static connect() {
    mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on("error", (err) => {
      console.log(err);
    });

    mongoose.connection.once("open", function () {
      console.log("Connected successfully");
    });
  }
}

module.exports.Database;
