require("dotenv").config({ path: "config/.env" });
const path = require("path");
const express = require("express");
const favicon = require("serve-favicon");
const routes = require("./app/routes.js");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "client"));

app.use(favicon(path.join(__dirname, "build", "client", "media", "facivon.ico")));
app.use(express.static(path.join(__dirname, "build", "client")));

app.use(routes());

app.listen(process.env.PORT || 8124, () => {
  console.log("App listening on port: " + (process.env.PORT || 8124));
});
