const { default: mongoose } = require("mongoose");
const mockoDB = require("./util/MockoDB");

module.exports.mochaHooks = {
  beforeAll: async () => {
    await mockoDB.connect();
  },

  beforeEach: async () => {
    await mongoose.connection.dropDatabase();
  },

  afterAll: async () => {
    await mockoDB.disconnect();
  },
};
