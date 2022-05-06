const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongo = MongoMemoryServer.create();

exports.connect = async () => {
  const uri = (await mongo).getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(uri, mongooseOpts);

  mongoose.connection.once("open", () => {
    console.log("Connected successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};

exports.disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await (await mongo).stop();
};
