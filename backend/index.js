const connectToMongo = require("./db"); // get the connection function to connect to database
const express = require("express"); // imoprt express for server

connectToMongo(); // function to connect to database
const app = express(); // //creatinng express app
const port = 3000; // port no

app.get("/", (req, res) => {
  res.send("Hello World!"); // sends hello world response
});

//start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
