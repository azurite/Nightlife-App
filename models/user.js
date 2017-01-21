const mongoose = require("mongoose");
const crypto = require("crypto");
const semver = require("semver");
const scmp = require("scmp");

var pbkdf2DigestSupport = semver.gte(process.version, "0.12.0");
var error = require("./utils/errors").userErrors;

var options = {
  saltlen: 32,
  keylen: 512,
  iterations: 50000,
  digest: "sha512",
  encoding: "hex"
};

var pbkdf2 = function(password, salt, cb) {
  if(pbkdf2DigestSupport) {
    crypto.pbkdf2(password, salt, options.iterations, options.keylen, options.digest, cb);
  }
  else {
    crypto.pbkdf2(password, salt, options.iterations, options.leylen, cb);
  }
};

const User = new mongoose.Schema({
  local: {
    name: String,
    image_url: { type: String, default: "/media/dummy-profile-pic.png" },
    email: { type: String, unique: true },
    hash: { type: String, select: false },
    salt: { type: String, select: false }
  },
  twitter: {
    id: { type: String, default: "" },
    token: { type: String, default: "" },
    profile: { type: Object, default: {} }
  },
  GitHub: {
    id: { type: String, default: "" },
    token: { type: String, default: "" },
    profile: { type: Object, default: {} }
  },
  isGoingTo: [{ id: String }]
});

// PRE: password to set and callback function
// POST: the user model with the hash and salt fields set, or an error
User.methods.setPassword = function(password, cb) {
  var self = this;

  crypto.randomBytes(options.saltlen, function(err, buffer) {
    if(err) {
      return cb(err);
    }
    var salt = buffer.toString(options.encoding);

    pbkdf2(password, salt, function(err, hashbuf) {
      if(err) {
        return cb(err);
      }
      self.set("local.hash", hashbuf.toString(options.encoding));
      self.set("local.salt", salt);

      cb(null, self);
    });
  });
};

// PRE: password to compare and callback function
// POST: user model if password is correct. Otherwise an error
User.methods.validatePassword = function(passwordCmp, cb) {
  var self = this;

  pbkdf2(passwordCmp, this.get("local.salt"), function(err, hashCmp) {
    if(err) {
      return cb(err);
    }
    if(scmp(hashCmp, new Buffer(self.get("local.hash"), options.encoding))) {
      return cb(null, self);
    }
    else {
      return cb(null, false);
    }
  });
};

// PRE: email address and boolean if hash and salt fields shall be included in result and optional callback function
// POST: either the user or empty if no user was found. returns query if no callback is specified
User.statics.findByEmail = function(email, selectCreds, cb) {
  var query = this.findOne({ "local.email": email });

  if(selectCreds) {
    query.select("+local.hash +local.salt");
  }

  if(cb) {
    return query.exec(cb);
  }
  return query;
};

// PRE: authentication function for passport localStrategy
// POST: user if authentication successfull, error otherwise
User.statics.authenticate = function() {
  var self = this;

  return function(email, password, cb) {
    self.findByEmail(email, true, function(err, user) {
      if(err) {
        return cb(err);
      }

      if(user) {
        return user.validatePassword(password, cb);
      }
      return cb(null, false);
    });
  };
};

// PRE: User Schema or object, password and callback function
// PSOT: new user if successfully created, error otherwise
User.statics.register = function(user, password, cb) {
  if(!(user instanceof this)) {
    user = new this(user);
  }

  var self = this;
  self.findByEmail(user.local.email, true, function(err, existingUser) {
    if(err) {
      return cb(err);
    }

    if(existingUser) {
      return cb(error.emailAlreadyTaken());
    }

    user.setPassword(password, function(err, user) {
      if(err) {
        return cb(err);
      }
      user.save(function(err) {
        if(err) {
          return cb(err);
        }
        cb(null, user);
      });
    });
  });
};

// PRE: user model and callback function
// POST: userId
User.statics.serializeUser = function() {
  return function(user, cb) {
    cb(null, user._id);
  };
};

// PRE: userId from serializer and callback function
// POST: user if found, empty if not found, error otherwise
User.statics.deserializeUser = function() {
  var self = this;

  return function(id, cb) {
    self.findById(id, cb);
  };
};

module.exports = mongoose.model("user", User);
