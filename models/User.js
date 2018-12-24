// models.User.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  favoritedShows: [
    {
      type: Schema.Types.ObjectId,
      ref: "Shows"
    }
  ],
  watchList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Show"
    }
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
