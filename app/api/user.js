const Account = require("../../models/user");
const normalize = require("../../models/utils/normalize");
const ensureAuth = require("./utils/ensure_auth");
const passport = require("passport");
const express = require("express");
const router = express.Router();

// Todo:
// -----
// delete account

router.post("/api/user/register", (req, res) => {
  var local = {
    name: req.body.name,
    email: req.body.email,
  };

  Account.register({ local: local, loginMethod: "local" }, req.body.password, (err, user) => {
    if(err) {
      res.json({ statusCode: 500, error: { message: err.message } });
      return;
    }
    passport.authenticate("local")(req, res, () => {
      res.json(normalize("user", user, "isGoingTo"));
    });
  });
});

router.post("/api/user/login", passport.authenticate("local"), (req, res) => {
  res.json(normalize("user", req.user, "isGoingTo"));
});

router.post("/api/user/logout", ensureAuth, (req, res) => {
  req.logout();
  req.session.destroy();
  res.json({ success: true });
});

router.delete("/api/user/deleteAccount", ensureAuth, (req, res) => {
  Account.removeUser(req.user._id, (err) => {
    if(err) {
      return res.status(500).json({ statusCode: 500, error: err });
    }
    req.logout();
    req.session.destroy();
    res.json({ success: true });
  });
});

router.post("/api/user/editVenue", ensureAuth, (req, res) => {
  Account.goToVenueOrRemove(req.body.type, req.user._id, req.body.venue, (err, user) => {
    if(err) {
      return res.status(500).json({ statusCode: 500, error: err });
    }
    res.json(normalize("user", user, "isGoingTo"));
  });
});

module.exports = function() {
  return router;
};
