const axios = require("axios");
require("dotenv").config({ path: ".env.local" });

const dbKey = process.env.dbKey;

const apiKey = process.env.API_KEY;
// const stockSymbol = process.env.STOCK_SYMBOL;
const interval = process.env.INTERVAL;

async function alphaVantage(req, res) {
    try {
        const { stockSymbol } = req.body;

        if (!stockSymbol) {
            return res.status(400).json({ error: "Provide Stock Symbol" });
        }

        const stockUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=${interval}&apikey=${apiKey}`;

        const response = await axios.get(stockUrl);
        const data = response.data;

        // Extract the latest stock price
        const timeSeries = data[`Time Series (${interval})`];
        if (!timeSeries) {
            return res
                .status(500)
                .json({ error: "Error fetching data from Alpha Vantage API" });
        }

        const latestTimestamp = Object.keys(timeSeries)[0];
        const latestData = timeSeries[latestTimestamp];
        const latestPrice = latestData["4. close"];

        res.json({
            symbol: stockSymbol,
            latest_price: latestPrice,
            timestamp: latestTimestamp,
        });
    } catch (error) {
        res.status(500).json({
            error: "Error fetching data from Alpha Vantage API",
        });
    }
}

module.exports = { alphaVantage };
