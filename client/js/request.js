const request = {
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
  }
};

module.exports = request;
