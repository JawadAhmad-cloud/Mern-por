const mongoose = require("mongoose");
const { Schema } = mongoose; // set the schema function to create a schema

const NoteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, //to link the user with the notes
    ref: "user", //reference to the user model
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("note", NoteSchema);
