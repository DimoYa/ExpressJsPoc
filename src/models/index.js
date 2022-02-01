const mongoose = require("mongoose");

require('./car');
require('./accessory');

const connectionString = "mongodb://localhost:27017/carbicle";

async function init() {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on("error", (err) => {
      console.log(err);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = init;
