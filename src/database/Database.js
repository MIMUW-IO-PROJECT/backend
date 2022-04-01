const mongoose = require("mongoose");

class Database {
  static connect() {
    mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on("error", (err) => {
      console.log(err);
    });

    mongoose.connection.once("open", () => {
      console.log("Connected successfully");
    });
  }
}

module.exports = Database;
