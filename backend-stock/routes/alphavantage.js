const express = require("express");
const router = express.Router();
const alphaVantageController = require("../controllers/alphavantage");

router.post("/latest-stock-price", alphaVantageController.alphaVantage);

module.exports = router;
