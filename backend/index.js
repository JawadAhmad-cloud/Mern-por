// Load environment variables from .env
require("dotenv").config();
const connectToMongo = require("./db"); // get the connection function to connect to database
const express = require("express"); // imoprt express for server
var cors = require("cors"); //importing cors to avoid cors error

connectToMongo(); // function to connect to database
const app = express(); // //creatinng express app
const port = 5000; // port no

app.use(cors()); //using cors as middleware
app.use(express.json()); //json middleware

//available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

//start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
