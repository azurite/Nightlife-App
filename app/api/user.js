const Account = require("../../models/user");
const normalize = require("../../models/utils/normalize");
const passport = require("passport");
const express = require("express");
const router = express.Router();

function ensureAuth(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    statusCode: 401,
    message: "unauthorized access to api"
  });
}

// Todo:
// -----
// go to venue
// remove from venue
// delete account

router.post("/api/user/register", (req, res) => {
  var local = {
    name: req.body.name,
    email: req.body.email,
  };

  Account.register({ local: local }, req.body.password, (err, user) => {
    if(err) {
      res.json({ statusCode: 500, error: { message: err.message } });
      return;
    }
    passport.authenticate("local")(req, res, () => {
      res.json(normalize(user));
    });
  });
});

router.post("/api/user/login", passport.authenticate("local"), (req, res) => {
  res.json(normalize(req.user));
});

router.post("/api/user/logout", ensureAuth, (req, res) => {
  req.logout();
  res.json({ success: true });
});

module.exports = function() {
  return router;
};
