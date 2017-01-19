require("dotenv").config({ path: "config/.env" });
const path = require("path");
const Account = require("./models/user");
const express = require("express");
const favicon = require("serve-favicon");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const yelp = require("./app/api/yelp.js");
const routes = require("./app/routes.js");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URI);

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000 // 2 weeks
  },
  resave: false,
  saveUninitialized: false
};

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "client"));

app.use(express.static(path.join(process.cwd(), "build", "client")));
app.use(favicon(path.join(process.cwd(), "build", "client", "media", "favicon.ico")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use(yelp());
app.use(routes());

app.listen(process.env.PORT || 8124, () => {
  console.log("App listening on port: " + (process.env.PORT || 8124));
});
