const express = require("express");
const User = require("../models/User"); //get the user model to save correct user data acording to schema
const router = express.Router(); //used to create route which will be used in the main index.js
const { body, validationResult } = require("express-validator");

//create a user using : POST "/api/auth/createuser" dosen't require auth
router.post(
  "/createuser",
  [
    body("name", "Enter a vaild Name").isLength({ min: 3 }), //to validate the name
    body("email", "Enter a valid Email").isEmail(), //to validate the email
    body("password", "Password must at least 5 character").isLength({ min: 5 }), //to validate the password
  ],
  async (req, res) => {
    //if there are errors return bad request
    const errors = validationResult(req); //using validator to get the error
    if (!errors.isEmpty()) {
      //checking if the error array is empty if it is not empty then we return the error
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check wether the useer email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      user = await User.create({
        //to create a uuser in mongodb
        name: req.body.name, // getting the data from the request
        email: req.body.email,
        password: req.body.password,
      });
      // .then((user) => res.json(user)) //for check purpose sending the user data back
      // .catch((err) => {
      //   //catching the error
      //   console.log(err);
      //   res.json({
      //     //sending the error message
      //     error: "PLease enter a unique value fro email",
      //     message: err.message,
      //   });
      //});
      res.json(user); //sending the user data back
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured"); //internal server error
    }
  }
);

module.exports = router;
