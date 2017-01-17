const React = require("react");
const { createStore } = require("redux");
const { Provider } = require("react-redux");
const { renderToString } = require("react-dom/server");
const { match, RouterContext } = require("react-router");

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

const express = require("express");
const router = express.Router();

router.get("*", (req, res, next) => {
  const store = createStore(reducer, initialState);
  req.reduxStore = store;
  next();
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
