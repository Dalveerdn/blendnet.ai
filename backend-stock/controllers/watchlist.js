const watchlistSchema = require("../schema/watchlist");

async function fetchWatchList(req, res) {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId not found. please login" });
    }

    const watchList = await watchlistSchema
      .find({ userId, watchListStatus: "Active" })
      .lean()
      .exec();

    if (!watchList || watchList.length === 0) {
      return res.status(404).json({ error: "Active watchlist not found." });
    }

    res.json(watchList);
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteWatchList(req, res) {
  try {
    const { userId, watchListId } = req.body;

    if (!userId || !watchListId) {
      return res
        .status(400)
        .json({ error: "userId, watchListId not found. please login" });
    }

    const updatedWatchList = await watchlistSchema.findOneAndUpdate(
      {
        userId,
        watchListId,
      },
      { $set: { watchListStatus: "deleted" } },
      { new: true },
    );

    if (updatedWatchList) {
      res.status(200).json({ message: "watchlist deleted successfully" });
    } else {
      res.status(404).json({ message: "watchlist not found" });
    }
  } catch (error) {
    console.error("Error deactivating slot:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

function generateWatchListId() {
  const currentDate = new Date();
  const year = currentDate.getFullYear() % 100;
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let uniqueString = "";
  for (let i = 0; i < 3; i++) {
    uniqueString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  const uniqueID = `WL${year}${month}${day}${uniqueString}`;

  return uniqueID;
}

async function addNewWatchList(req, res) {
  try {
    const {
      userId,
      watchListCode,
      watchListName,
      watchListDiscription,
      watchListHigestPrice,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId not found. please login" });
    }

    const indianTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });

    const newwatchlist = new watchlistSchema({
      userId,
      watchListId: await generateWatchListId(),
      watchListSymbol: watchListCode,
      watchListName,
      watchListHigestPrice: watchListHigestPrice,
      watchListDiscription,
      watchListStatus: "Active",
      userRegistrartionDate: new Date(indianTime),
    });

    const createdwatchlist = await newwatchlist.save();

    if (!createdwatchlist) {
      return res.status(401).json({ message: "unable to create watch list" });
    }

    return res.status(200).json({
      message: "watchlist created successfully",
      watchList: createdwatchlist,
    });
  } catch (error) {
    console.error("Error creating watch list:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function editWatchList(req, res) {
  try {
    const { userId, watchListId, updatedData } = req.body;

    if (!userId || !updatedData || !watchListId) {
      return res
        .status(400)
        .json({ error: "new data and userId not provided. please login" });
    }

    const updatedWatchlist = await watchlistSchema.findOneAndUpdate(
      { userId, watchListId, watchListStatus: "Active" },
      { $set: updatedData },
      { new: true },
    );

    if (updatedWatchlist) {
      return res.status(200).json({
        message: "watchlist updated successfully",
        watchlist: updatedWatchlist,
      });
    } else {
      return res.status(404).json({ message: "watchlist not found" });
    }
  } catch (error) {
    console.error("Error updating watchlist:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  fetchWatchList,
  addNewWatchList,
  deleteWatchList,
  editWatchList,
};
