const Axios = require("axios");

const _request = function() {

  const stringify = function(q) {
    var qs = "?", keys = Object.keys(q);

    for(var i = 0; i < keys.length; i++) {
      qs += keys[i] + "=" + q[keys[i]];
      i < (keys.length - 1) ? qs += "&" : false;
    }
    return qs;
  };

  return {
    fetchYelp: function fetchYelp(opt, cb) {
      Axios.get("/api/yelp/search" + stringify(opt))
      .then((res) => {
        if(res.data.statusCode === 400) {
          return cb(null, []);
        }
        cb(null, res.data.businesses);
      })
      .catch(function(err) {
        err.message = err.message || "internal server error";
        cb(err);
      });
    },
    fetchBusiness: function fetchBusiness(opt, cb) {
      Axios.get("/api/yelp/business" + stringify(opt))
      .then((res) => {
        if(res.data.statusCode === 400) {
          return cb({ message: "'" + opt.id + "' didn't match any results"  });
        }
        cb(null, res.data);
      })
      .catch(function(err) {
        err.message = err.message || "internal server error";
        cb(err);
      });
    },
    registerUser: function registerUser(opt, cb) {
      Axios.post("/api/user/register", opt)
      .then((res) => {
        if(res.data.statusCode === 500) {
          return cb(res.data.error);
        }
        cb(null, res.data);
      })
      .catch((err) => {
        err.message = err.message || "internal server error";
        cb(err);
      });
    },
    loginUser: function loginUser(opt, cb) {
      Axios.post("/api/user/login", opt)
      .then((res) => {
        cb(null, res.data);
      })
      .catch((err) => {
        if(err.response && err.response.status === 401) {
          cb({ message: "wrong username or password" });
        }
        else {
          err.message = err.message || "internal server error";
          cb(err);
        }
      });
    },
    logoutUser: function logoutUser(cb) {
      Axios.post("/api/user/logout")
      .then((res) => {
        cb(null, res.data);
      })
      .catch((err) => {
        err.message = err.message || "internal server error";
        cb(err);
      });
    }
  };
};

const request = {
  pretendFetchIsGoing: function pretendFetchIsGoing(cb) {
    require.ensure([], function(require) {
      cb(null, require("./dev/sample_is_going_to.js"));
    });
  },
  real: _request()
};

module.exports = request;
