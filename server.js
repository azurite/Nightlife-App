require("dotenv").config({ path: "config/.env" });
const path = require("path");
const Account = require("./models/user");
const express = require("express");
const logger = require("connect-logger");
const favicon = require("serve-favicon");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const GithubStrategy = require("passport-github").Strategy;

const venue = require("./app/api/venue.js");
const user = require("./app/api/user.js");
const yelp = require("./app/api/yelp.js");
const routes = require("./app/routes.js");

const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
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

app.set("PORT", process.env.PORT || 8124);
app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "client"));

app.use(logger());
app.use(express.static(path.join(process.cwd(), "build", "client")));
app.use(express.static(path.join(process.cwd(), "client")));
app.use(favicon(path.join(process.cwd(), "client", "media", "favicon.ico")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session(sessionOptions));

passport.use(
  new LocalStrategy({
    usernameField: "email"
  },
  Account.authenticate())
);
passport.use(
  new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:8124/auth/twitter/callback"
  },
  Account.socialAuth("twitter")
  )
);
passport.use(
  new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  },
  Account.socialAuth("github")
  )
);
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

app.use(venue());
app.use(user());
app.use(yelp());
app.use(routes());

app.listen(app.get("PORT"), () => {
  console.log("App listening on port: " + app.get("PORT"));
});
