require("dotenv").config({ path: "config/.env" });
const path = require("path");
const express = require("express");
const favicon = require("serve-favicon");
const routes = require("./app/routes.js");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "client"));

app.use(favicon(path.join(process.cwd(), "build", "client", "media", "favicon.ico")));
app.use(express.static(path.join(process.cwd(), "build", "client")));

app.use(routes());

app.listen(process.env.PORT || 8124, () => {
  console.log("App listening on port: " + (process.env.PORT || 8124));
});
