import React, { useState } from "react";

function App() {
  const [varwatchList, setvarwatchList] = useState([]);
  const [showAddWatchListForm, setshowAddWatchListForm] = useState(false);
  const [showWatchList, setshowWatchList] = useState(false);

  const [formData, setFormData] = useState({
    watchListSymboladd: "",
    watchListNameadd: "",
    watchListHigestPriceadd: "",
    watchListDiscriptionadd: "",
  });

  //////////////////////////// cret watch list //////

  const openAddWatchListForm = () => {
    setshowAddWatchListForm(true);
    var formModal = document.getElementById("formModal");
    if (formModal.style.display === "none" || formModal.style.display === "") {
      formModal.style.display = "block";
      setFormData({
        watchListSymboladd: "",
        watchListNameadd: "",
        watchListHigestPriceadd: "",
        watchListDiscriptionadd: "",
      });
    } else {
      formModal.style.display = "none";
    }
  };

  const closeAddWatchListForm = () => {
    setshowAddWatchListForm(false);
    var formModal = document.getElementById("formModal");
    formModal.style.display = "none";
  };

  const handleInputChangeForm = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    console.log("FormData:", formData);
  };

  const CreatNewWatclist = () => {
    event.preventDefault();
    const url =
      "https://7d238dba-17a0-4192-b3f2-8f7132a5b800-00-2m11dy39x9dz7.pike.replit.dev/add-newwatchlist";

    const payload = {
      userId: "US240517nlOi",
      watchListHigestPrice: formData.watchListHigestPriceadd,
      watchListDiscription: formData.watchListDiscriptionadd,
      watchListName: formData.watchListNameadd,
      watchListCode: formData.watchListSymboladd,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        alert("watchlist saved successfully!");
        closeAddWatchListForm();
      })
      .then((data) => {
        console.log("Registration successful:", data);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  ///////////// watch list showcse //////////
  const closeWatchlistContainer = () => {
    setshowWatchList(false);
    document.getElementById("btn-watchList").style.display = "block";
    document.getElementById("watchList").style.display = "none";
    document.getElementById("watchListFields").style.display = "none";
    document.getElementById("stock-records").style.display = "none";
  };

  const openWatchlistContainer = () => {
    setshowWatchList(true);
    document.getElementById("watchList").style.display = "block";
    document.getElementById("watchListFields").style.display = "flex";
    document.getElementById("stock-records").style.display = "flex";
    document.getElementById("btn-watchList").style.display = "none";
  };

  const createWatchListButtons = (watchListData) => {
    const btnContainer = document.getElementById("btn-symbol-cont");
    if (btnContainer) {
      btnContainer.innerHTML = "";
      let buttonsHTML = "";
      watchListData.forEach((item) => {
        buttonsHTML += `<button class="symbol-button" id="symbol-button"
        onclick="showDetails('${item.watchListId}')">${item.watchListSymbol}</button>`;
      });
      btnContainer.innerHTML = buttonsHTML;
      console.log("i am working");
    }
  };

  async function showDetails(watchListId) {
    const watchListItem = varwatchList.find(
      (item) => item.watchListId === watchListId,
    );
    if (watchListItem) {
      const stockPrices = await fetchStockPrices(watchListItem.watchListSymbol);
      console.log("Stock prices:", stockPrices);
      if (
        parseFloat(watchListItem.watchListHigestPrice) <
        parseFloat(stockPrices.latest_price)
      ) {
        console.log("Price increased");
        const updatedprice = await editpriceList(
          watchListItem.watchListId,
          stockPrices.latest_price,
        );

        if (!updatedprice) {
          console.log("Error in updating stock price");
        }
        document.getElementById("watchListName").textContent =
          watchListItem.watchListName;
        document.getElementById("watchListHighestPrice").textContent =
          watchListItem.watchListHigestPrice;
        document.getElementById("watchListDescription").textContent =
          watchListItem.watchListDiscription;
        document.getElementById("stockLastPrice").textContent =
          "Last Highest Price: " + watchListItem.watchListHigestPrice;
        document.getElementById("stockNewPrice").textContent =
          "New Highest Price: " + stockPrices.latest_price;
        document.getElementById("watchListDetails").style.display = "block";
      }
      document.getElementById("watchListName").textContent =
        watchListItem.watchListName;
      document.getElementById("watchListHighestPrice").textContent =
        watchListItem.watchListHigestPrice;
      document.getElementById("watchListDescription").textContent =
        watchListItem.watchListDiscription;
      document.getElementById("stockLastPrice").textContent =
        "Last Highest Price: " + watchListItem.watchListHigestPrice;
      document.getElementById("stockNewPrice").textContent =
        "New Highest Price: " + stockPrices.latest_price;
      document.getElementById("watchListDetails").style.display = "block";
    }
  }

  async function editpriceList(editpriceListId, latestPrice) {
    const url =
      "https://7d238dba-17a0-4192-b3f2-8f7132a5b800-00-2m11dy39x9dz7.pike.replit.dev/edit-watchlist";

    const payload = {
      userId: "US240517nlOi",
      watchListId: editpriceListId,
      updatedData: { watchListHigestPrice: latestPrice },
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to edit watchlist");
      }

      const responseData = await response.json();
      console.log("Edit watchlist response:", responseData);
      return responseData; // Return the response data if needed
    } catch (error) {
      console.error("Error editing watchlist:", error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  }

  async function fetchStockPrices(watchListSymbol) {
    const url =
      "https://7d238dba-17a0-4192-b3f2-8f7132a5b800-00-2m11dy39x9dz7.pike.replit.dev/latest-stock-price";
    const payload = { stockSymbol: watchListSymbol };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch stock prices");
      }

      const data = await response.json();
      console.log("Received stock prices:", data);
      return data;
    } catch (error) {
      console.error("Error fetching stock prices:", error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  }

  const fetchWatchList = () => {
    event.preventDefault();
    openWatchlistContainer();
    const url =
      "https://7d238dba-17a0-4192-b3f2-8f7132a5b800-00-2m11dy39x9dz7.pike.replit.dev/watchlist";

    const payload = {
      userId: "US240517nlOi",
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("watched list fetched successful:", data);
        alert("watchlist Received!");
        setvarwatchList(data);
        createWatchListButtons(data);
        openWatchlistContainer();
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  window.showDetails = showDetails;

  return (
    <div className="global-container">
      <button
        className="btn-watchList"
        id="btn-watchList"
        onClick={fetchWatchList}
      >
        watchList
      </button>
      <div
        className="modal-overlay"
        id="modalOverlay"
        onClick={openAddWatchListForm}
      ></div>
      {showAddWatchListForm && (
        <div className="modal" id="formModal">
          <div className="modal-header">
            <span
              className="close-button"
              id="closeFormButton"
              onClick={closeAddWatchListForm}
            >
              &times;
            </span>
          </div>
          <form id="cre-sym-form">
            <div className="form-group">
              <label for="watchListSymbol">Watchlist Symbol:</label>
              <input
                type="text"
                id="watchListSymboladd"
                name="watchListSymbol"
                required
                value={formData.watchListSymboladd}
                onChange={handleInputChangeForm}
              />
            </div>
            <div className="form-group">
              <label for="watchListName">Watchlist Name:</label>
              <input
                type="text"
                id="watchListNameadd"
                name="watchListName"
                required
                value={formData.watchListNameadd}
                onChange={handleInputChangeForm}
              />
            </div>
            <div className="form-group">
              <label for="watchListHigestPrice">Watchlist Highest Price:</label>
              <input
                type="text"
                id="watchListHigestPriceadd"
                name="watchListHigestPrice"
                required
                value={formData.watchListHigestPriceadd}
                onChange={handleInputChangeForm}
              />
            </div>
            <div className="form-group">
              <label for="watchListDiscription">Watchlist Description:</label>
              <textarea
                type="text"
                id="watchListDiscriptionadd"
                name="watchListDiscription"
                value={formData.watchListDiscriptionadd}
                onChange={handleInputChangeForm}
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                id="submitbutton"
                className="save-button"
                onClick={CreatNewWatclist}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
      {showWatchList && (
        <div className="watchList" id="watchList">
          <span
            className="das-close-icon"
            id="das-close-icon"
            onClick={closeWatchlistContainer}
          >
            &times;
          </span>
          <div className="btn-symbol-cont" id="btn-symbol-cont"></div>
          <div className="dashboard">
            <div className="watchListFields" id="watchListFields">
              <p id="watchListName" className="detailstock"></p>
              <p id="watchListHighestPrice" className="detailstock"></p>
              <p id="watchListDescription" className="detailstock"></p>
            </div>
          </div>
          <div className="stock-records" id="stock-records">
            <h5>Your stock Track</h5>
            <p id="stockLastPrice" className="stock-data-p"></p>
            <p id="stockNewPrice" className="stock-data-p"></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
