const Account = require("../../models/user");
const express = require("express");
const router = express.Router();

//Todo:
//login
//logout
//register (done)
//go to venue
//remove from venue

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
    res.json(user.normalize());
  });
});

module.exports = function() {
  return router;
};
