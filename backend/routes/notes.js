const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser"); //to get the user from the jwt token
const Note = require("../models/Note"); // get the notes model to save correct notes data acording to schema
const { body, validationResult } = require("express-validator"); //validate inputs

//Route1: get all the notes using : get '/api/notes/fetchallnotes' login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured"); //internal server error
  }
});

//Route2: add the notes using : post '/api/notes/addnote' login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }), //to validate the title
    body("description", "description must at least 5 character").isLength({
      min: 5,
    }), //to validate the description
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body; //destructuring
      //if there are errors return bad request
      const errror = validationResult(req); //using validator to get the error
      if (!errror.isEmpty()) {
        //checking if the error array is empty if it is not empty then we return the error
        return res.status(400).json({ errors: errror.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id, //getting the user id from the fetchuser middleware
      });
      const savedNote = await note.save(); //saving the note to the database
      res.json(savedNote); //sending the saved note as response
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured"); //internal server error
    }
  }
);

module.exports = router;
