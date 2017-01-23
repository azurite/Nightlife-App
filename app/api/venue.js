const url = require("url");
const qs = require("querystring");

const Venue = require("../../models/venue");
const normalize = require("../../models/utils/normalize");
const ensureAuth = require("./utils/ensure_auth");
const express = require("express");
const router = express.Router();

router.get("/api/venue/isGoing", ensureAuth, (req, res) => {
  var venueId = qs.parse(url.parse(req.url).query).id;
  Venue.findOne({ venueId: venueId })
    .populate("isGoing")
    .exec((err, venue) => {
      if(err) {
        return res.status(500).json({ statusCode: 500, error: err });
      }
      if(venue) {
        return res.json(normalize("venue", venue, "isGoing").isGoing);
      }
      res.json([]);
    });
});

module.exports = function() {
  return router;
};
