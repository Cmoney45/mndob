// models.Show.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const showSchema = new Schema({
  usersWhoHaveFavorited: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users"
    }
  ],
  usersWhoHaveOnWatchlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users"
    }
  ],
  show: {
    type: Object,
    requried: true
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const Show = mongoose.model("Show", showSchema);

module.exports = Show;
