## Justifiction:
   1) I have 2 years of experience in Python (3 months with Django), but for web technology, I have chosen Node.js.
   2) I would rate myself 7 out of 10 for backend development for this assignment.
   3) I built the frontend just to show the implementation. I can build a better UI with additional support.
   4) Used Replit.com for development.
   5) Please read all the points; they can help illustrate why you should hire me.
      
### Note:
   1) Do not use SSL files for any use case, if provided.
   2) Use the following command to generate SSL: "openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes".
   3) Use .env.local or env to save "Database key," "JWT Authentication key," "default port number," "API key," and "API interval."
   4)  I built the system to take only the stock symbol by default, but the interval can be specified by the user as well.
      
### Tools used:
   1) React.js (Front-end)
   2) Node.js (Server backend)
   3) MongoDB (Database)
   4) Alpha Vantage API.

### Backend:
  1) I built the backend within 35 minutes.
  2) Created separate instances of CPU cores, allowing for the creation of multiple servers in a horizontally scaled system.
  3) Used HTTPS for communication between the frontend and backend.
  4) Implemented Cross-Origin Resource Sharing (CORS); for now, any domain can request the backend, but we can restrict this.
  5) Used JWT for authentication and token generation.
  6) The backend verifies "userId" from the token for login confirmation, so "userId" does not come from the frontend.
  7) If someone tries to send "userId," middleware will restrict it as a "bad request."
  8) Middleware extracts the token from cookies and, after decoding, replaces it with a new token.

### Backend Testing:
  1) I used Replit.com, which provides "0.5 vCPU." I used a file size of "38.19 MiB."
  2) Using Python, I sent 1200+ requests in 2 to 2.7 seconds using a thread pool.

### Frontend:
   1) Used React.js for the frontend, just to show the working of backend APIs and task implementation.
   2) Implemented registration and login system using email and password.
   3) The backend generates userId and watchlistId (refer to schema).
   4) Once logged in, users can create a watchlist by adding "stock symbol," "stock name," "stock description," and "stock price."
   5) Users can view all their watchlists and respective details.
   6) If the current stock price is greater than the previous price, the frontend will send the new price to the backend to update the price fields.

### Frontend Testing:
  1) All the features are working. Visit videos.
  2) Spend 2.5 hours.

### Task Videos:
  1) https://www.loom.com/share/dd6e90abaefe42fc8583608f0d399e4b?sid=542deca8-02ee-4dcb-8f0d-e62c5b4c8b53
  2) https://www.loom.com/share/a87d5cb5d752417188bbfc15e4b7675a?sid=d8232b6f-9168-4975-91e7-c014ead335fc

### Task Explanation:
  1) In the first video, I started the server and frontend, both running on different IP addresses, ports, and domains. After that, I tested the registration and login forms. Then, I created a watchlist for Microsoft stock (clicked twice, resulting in two watchlists created for the same symbol). Next, I fetched the watchlists and clicked on each one to show their respective details.
  2) In the second video, I'm demonstrating how the price is being updated in the backend. In the first video, I set the price for Microsoft stock as "0," but in the second video, it's being updated.

### Enhancement:
  1) Can implement socket.io connection for full duplex communication between client and server.
  2) Others related to frontend.

