const React = require("react");
const { createStore } = require("redux");
const { Provider } = require("react-redux");
const { renderToString } = require("react-dom/server");
const { match, RouterContext } = require("react-router");
const passport = require("passport");
const normalize = require("../models/utils/normalize");
const Yelp = require("yelp");

var yelp = new Yelp({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

const routes = require("../client/js/routes.js");
const assets = require("./serve_bundles.js")({
  root: process.cwd(),
  path: "/build/client",
  publicPath: "/",
  sort: {
    scripts: ["manifest", "vendor", "style", "app"]
  }
});

const reducer = require("../client/js/reducers/root-reducer");
const initialState = require("../client/js/reducers/initialState");
const actions = Object.assign({},
  require("../client/js/actions/venue_detail"),
  require("../client/js/actions/login")
);

const express = require("express");
const router = express.Router();

router.get("*", (req, res, next) => {
  const store = createStore(reducer, initialState);
  req.reduxStore = store;
  next();
});

router.get("/auth/twitter", passport.authenticate("twitter"));

router.get("/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  (req, res, next) => {
    next();
  }
);

router.get("/auth/github", passport.authenticate("github"));

router.get("/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res, next) => {
    next();
  }
);

router.get("*", (req, res, next) => {
  if(req.isAuthenticated()) {
    req.reduxStore.dispatch(
      actions.loginSuccess(normalize("user", req.user, "isGoingTo"))
    );
  }

  next();
});

router.get("/venue/:id", (req, res, next) => {
  yelp.business(req.params.id)
  .then(function(data) {
    if(data.statusCode === 400) {
      req.reduxStore.dispatch(actions.venueError({
        message: "'" + req.params.id + "' didn't match any venues"
      }));
      return next();
    }
    req.reduxStore.dispatch(actions.venueSuccess(data));
    next();
  })
  .catch(function(err) {
    err.message = err.message || "error with the yelp api";
    req.reduxStore.dispatch(actions.venueError(err));
    next();
  });
});

router.get("*", (req, res) => {
  const preloadedState = req.reduxStore.getState();

  match({ routes: routes(req.reduxStore), location: req.url }, (err, redirect, props) => {
    if(err) {
      res.status(500).send(err.message);
    }
    else if(redirect) {
      res.redirect(redirect.pathname + redirect.search);
    }
    else if(props) {
      const html = renderToString(
        <Provider store={req.reduxStore}>
          <RouterContext {...props}/>
        </Provider>
      );
      res.render("index", { app: html, assets: assets, preloadedState: preloadedState });
    }
    else {
      res.status(404).send("not found");
    }
  });
});

module.exports = function() {
  return router;
};
