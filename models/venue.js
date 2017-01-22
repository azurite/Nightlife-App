const mongoose = require("mongoose");

const Venue = mongoose.Schema({
  venueId: { type: String, unique: true },
  name: String,
  image_url: { type: String, default: "/media/thumbnail-default.png" },
  isGoing: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]
});

module.exports = mongoose.model("venue", Venue);
