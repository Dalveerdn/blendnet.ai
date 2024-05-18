const cluster = require("cluster");
const os = require("os");
const connectDB = require("./dbconnection");
const express = require("express");
const fs = require("fs");
const https = require("https");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { authenticateToken } = require("./middleware");

const userRoutes = require("./routes/loginlogout");
const watchlistRoutes = require("./routes/watchlist");
const alphaVantageRoutes = require("./routes/alphavantage");

// Check if the current process is the master process
if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);

    cluster.fork();
  });
} else {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors());

  const server = https.createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app,
  );

  connectDB();

  app.post("/latest-stock-price", alphaVantageRoutes);
  app.post("/user-registration", userRoutes);
  app.post("/login", userRoutes);
  app.get("/", (req, res) => {
    if (req.isLoggedIn) {
      // res.sendFile(path.join(__dirname, "index.html"));
      return res.status(200).json({ error: "please login" });
    } else {
      return res.status(400).json({ error: "please login" });
    }
  });

  app.use(authenticateToken);

  app.get("/logout", userRoutes);
  app.post("/watchlist", watchlistRoutes);
  app.post("/add-newwatchlist", watchlistRoutes);
  app.delete("/deleted-watchlist", watchlistRoutes);
  app.put("/edit-watchlist", watchlistRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Worker ${cluster.worker.id} is running on port ${PORT}`);
  });
}
