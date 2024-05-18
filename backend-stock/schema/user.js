const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const indianTime = new Date().toLocaleString("en-US", {
  timeZone: "Asia/Kolkata",
});

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userRegistrartionDate: {
    type: Date,
    default: new Date(indianTime),
  },
});

module.exports = mongoose.model("usercollection", userSchema);
