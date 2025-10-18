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
      res.status(500).send("Internal server error occured"); //internal server error
    }
  }
);

//Route3: update existing the notes using : put '/api/notes/updatenote' login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  //create new note object
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to be updated
    let note = await Note.findById(req.params.id);
    //checkc if their is any note with the id
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //check if it is the user that was logged in
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    //find the note to update
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occured"); //internal server error
  }
});

//Route4: delete existing the notes using : delete '/api/notes/deletenote' login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be deleted
    let note = await Note.findById(req.params.id);
    //check if their is any note with the id
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //check if it is the user that was logged in then allow to delete
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    //find the note to update
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note have been deleted", note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occured"); //internal server error
  }
});

module.exports = router;
