const mongoose = require("mongoose");
const { Schema } = mongoose; // set the schema function to create a schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("user", UserSchema);
// User.createIndexes(); //to aviod dublicate values
module.exports = User;
