require("./venue");
const mongoose = require("mongoose");
const crypto = require("crypto");
const semver = require("semver");
const scmp = require("scmp");

const Venue = mongoose.model("venue");

const ObjectId = function(id) {
  return /^[a-fA-F0-9]{24}$/.test(id) === true ? id : "";
};

const createOrder = function(type, field, value) {
  var order = {};

  switch(type) {
    case "add":
      order.$push = { [field]: value };
      break;

    case "remove":
      order.$pull = { [field]: { id: value.id } };
      break;
  }

  return order;
};

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
    email: { type: String, unique: true, sparse: true },
    hash: { type: String, select: false },
    salt: { type: String, select: false }
  },
  twitter: {
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    image_url: { type: String, default: "/media/dummy-profile-pic.png" }
  },
  github: {
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    image_url: { type: String, default: "/media/dummy-profile-pic.png" }
  },
  isGoingTo: [{ id: String, name: String, image_url: String }],
  loginMethod: String,
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

// PRE: loginMethod of social media (eg. "twitter" or "github")
// POST: authenticated user from database (either found or created)
User.statics.socialAuth = function(loginMethod) {
  if(typeof loginMethod === "undefined") {
    throw new TypeError("User.socialAuth() loginMethod not specified");
  }

  var self = this;

  /*
   * The createUpdate() and createUser() functions were build with the assumption that
   * every social media host stores it's user information differently and therefore
   * I had to make sure to grab each piece of information from it's own place.
   * Surprisingly twitter and github store their userinformation in the exact same format
   * and that kind of makes these functions obsolete. However I decieded to keep them since
   * the format can change or I want to add further login methods.
   */

  const createUpdate = function(method, profile) {
    var update = {};

    switch(method) {
      case "twitter":
        update.$set = {
          "twitter.name": profile.displayName,
          "twitter.image_url": profile.photos[0].value.replace("_normal", "")
        };
        break;

      case "github":
        update.$set = {
          "github.name": profile.displayName,
          "github.image_url": profile.photos[0].value
        };
        break;

      default:
        throw new TypeError("createUpdate() unknown method: " + method);
    }

    return update;
  };

  const createUser = function(method, Model, profile) {
    switch(method) {
      case "twitter":
        return new Model({
          twitter: {
            id: profile.id,
            name: profile.displayName,
            image_url: profile.photos[0].value.replace("_normal", "")
          },
          loginMethod: method
        });

      case "github":
        return new Model({
          github: {
            id: profile.id,
            name: profile.displayName,
            image_url: profile.photos[0].value
          },
          loginMethod: method
        });

      default:
        throw new TypeError("createUser() unknown loginMethod: " + method);
    }
  };

  return function(token, tokenSecret, profile, done) {
    self.findOneAndUpdate(
      { [loginMethod + ".id"]: profile.id },
      createUpdate(loginMethod, profile),
      { new: true },
      (err, user) => {
        if(err) {
          return done(err);
        }
        if(!user) {
          var newUser = createUser(loginMethod, self, profile);
          newUser.save((err) => {
            if(err) {
              return done(err);
            }
            done(null, newUser);
          });
        }
        else {
          done(null, user);
        }
      });
  };
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
    self.findById(id)
      .populate("isGoingTo")
      .exec(cb);
  };
};

// PRE: type: "add" | "remove", _id: String, venue: { id: String, image_url: String }
// POST: updated user document
User.statics.goToVenueOrRemove = function(type, userId, venue, cb) {
  this.findOneAndUpdate(
    { _id: ObjectId(userId) },
    createOrder(type, "isGoingTo", venue),
    { new: true }
  )
  .populate("isGoingTo")
  .exec((err, user) => {
    if(err) {
      return cb(err);
    }
    Venue.findOne({ venueId: venue.id }, (err, foundVenue) => {
      if(err) {
        return cb(err);
      }
      if(foundVenue) {
        switch(type) {
          case "add":
            foundVenue.isGoing.push(ObjectId(userId));
            break;

          case "remove":
            foundVenue.isGoing = foundVenue.isGoing.filter((id) => {
              return !id.equals(userId);
            });
            break;
        }
        if(foundVenue.isGoing.length === 0) {
          foundVenue.remove((err) => {
            return cb(err, user);
          });
        }
        else {
          foundVenue.save((err) => {
            cb(err, user);
          });
        }
      }
      else {
        var newVenue = new Venue({
          venueId: venue.id,
          name: venue.name,
          image_url: venue.image_url,
          isGoing: [ObjectId(userId)]
        });

        newVenue.save((err) => {
          cb(err, user);
        });
      }
    });
  });
};

module.exports = mongoose.model("user", User);
