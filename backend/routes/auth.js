const express = require("express");
const User = require("../models/User"); //get the user model to save correct user data acording to schema
const router = express.Router(); //used to create route which will be used in the main index.js

//create a user using : POST "/api/auth/" dosen't require auth
router.post("/", (req, res) => {
  console.log(req.body);
  const user = User(req.body); //get the request data and then check it with the model
  user.save(); //used to save the data to mongodb database
  res.send(req.body); //send some reaposne
});

module.exports = router;
