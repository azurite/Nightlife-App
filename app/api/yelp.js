const qs = require("querystring");
const url = require("url");

const Yelp = require("yelp");
const express = require("express");
const router = express.Router();

var yelp = new Yelp({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

router.get("/api/yelp/search", (req, res) => {
  var query = qs.parse(url.parse(req.url).query);
  query.term = "bar";

  yelp.search(query)
  .then(function(data) {
    res.send(data);
  })
  .catch(function(err) {
    res.send(err);
  });
});

router.get("/api/yelp/business", (req, res) => {
  var query = qs.parse(url.parse(req.url).query);

  yelp.business(query.id)
  .then(function(data) {
    res.send(data);
  })
  .catch(function(err) {
    res.send(err);
  });
});

module.exports = function() {
  return router;
};
