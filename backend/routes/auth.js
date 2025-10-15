const express = require("express");
const User = require("../models/User"); //get the user model to save correct user data acording to schema
const router = express.Router(); //used to create route which will be used in the main index.js
const { body, validationResult } = require("express-validator"); // to validate the user input
const bcrypt = require("bcryptjs"); //to hash the password
var jwt = require("jsonwebtoken"); //to generate the jwt token
var fetchuser = require("../middleware/fetchuser"); //to get the user from the jwt token

const JWT_SECRET = "jawadisagoodboy"; //secret key to sign the jwt token

//Route1: create a user using : POST "/api/auth/createuser" dosen't require auth
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

      const salt = await bcrypt.genSalt(10); //generating salt for hashing
      secPass = await bcrypt.hash(req.body.password, salt); //hashing the password with salt

      //create a new user
      user = await User.create({
        //to create a uuser in mongodb
        name: req.body.name, // getting the data from the request
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id, //storing the user id in the data variable
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET); //generating the jwt token

      res.json({ authToken }); //sending the token as response
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured"); //internal server error
    }
  }
);

//Route2: authenticate a user /api/auth/login
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(), //to validate the email
  ],
  async (req, res) => {
    //if there are errors return bad request
    const errors = validationResult(req); //using validator to get the error
    if (!errors.isEmpty()) {
      //checking if the error array is empty if it is not empty then we return the error
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; //destructuring the email and password from the request body
    try {
      let user = await User.findOne({ email }); //finding the user with the email
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password); //comparing the password with the hashed password
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET); //generating the jwt token

      res.json({ authToken }); //sending the token as response
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error"); //internal server error
    }
  }
);

//Route3: Get logged in user details using: POST "/api/auth/getuser" login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id; //getting the user id from the req object which is added by the fetchuser middleware
    const user = await User.findById(userId).select("-password"); //selecting all the fields except the password
    res.send(user); //sending the user as response
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error"); //internal server error
  }
});
module.exports = router;
