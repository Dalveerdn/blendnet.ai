const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

const dbKey = process.env.dbKey;

async function connectDB() {
  try {
    await mongoose.connect(dbKey, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
