const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: { type: String, unique: true },
  twitter: {
    id: String,
    token: String,
    profile: Object
  },
  GitHub: {
    id: String,
    token: String,
    profile: Object
  },
  isGoingTo: [{ id: String }]
});

// adds the following fields:
//
// username: String,
// hash: String,
// salt: String,
// attempts: Number,
// lastLogin: Date,

User.plugin(passportLocalMongoose, {
  errorMessages: true
});

module.exports = mongoose.model("user", User);
