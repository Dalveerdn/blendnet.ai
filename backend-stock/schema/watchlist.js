const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const indianTime = new Date().toLocaleString("en-US", {
  timeZone: "Asia/Kolkata",
});

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  watchListId: {
    type: String,
    required: true,
    unique: true,
  },
  watchListStatus: {
    type: String,
    enum: ["Active", "deleted"],
    required: true,
  },
  watchListSymbol: {
    type: String,
    required: true,
    defaut: "NEW",
  },
  watchListName: {
    type: String,
    required: true,
    defaut: "Undefined",
  },
  watchListHigestPrice: {
    type: String,
    required: true,
    defaut: "0",
  },
  watchListDiscription: {
    type: String,
    required: true,
    defaut: "",
  },
  watchListCreatedDate: {
    type: Date,
    default: new Date(indianTime),
  },
});

module.exports = mongoose.model("watchlistcollection", userSchema);
