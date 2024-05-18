const express = require("express");
const router = express.Router();
const watchlistController = require("../controllers/watchlist");

router.post("/add-newwatchlist", watchlistController.addNewWatchList);
router.delete("/deleted-watchlist", watchlistController.deleteWatchList);
router.put("/edit-watchlist", watchlistController.editWatchList);
router.post("/watchlist", watchlistController.fetchWatchList);

module.exports = router;
