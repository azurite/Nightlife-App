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
    }
  };
};

const request = {
  /*
  pretendFetchYelp: function pretendFetchYelp(cb) {
    require.ensure([], function(require) {
      cb(null, require("./dev/sample_yelp_data.js").businesses);
    });
  },
  pretendFetchDetail: function pretendFetchDetail(id, cb) {
    require.ensure([], function(require) {
      let venue = require("./dev/sample_yelp_data.js").businesses.find((v) => {
        return v.id === id;
      });
      cb(null, venue);
    });
  },
  */
  pretendFetchIsGoing: function pretendFetchIsGoing(cb) {
    require.ensure([], function(require) {
      cb(null, require("./dev/sample_is_going_to.js"));
    });
  },
  pretendLogin: function pretendLogin(info, cb) {
    var user = require("./dev/sample_user.js");
    setTimeout(cb, 1000, null, user);
  },
  pretendRegister: function pretendRegister(info, cb) {
    var user = require("./dev/sample_user.js");
    setTimeout(cb, 1000, null, user);
  },
  pretendLogout: function pretendLogout(cb) {
    setTimeout(cb, 1000);
  },
  real: _request()
};

module.exports = request;
