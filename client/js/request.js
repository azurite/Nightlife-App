const request = {
  pretendFetchYelp: function pretendFetchYelp(cb) {
    require.ensure([], function(require) {
      cb(null, require("./dev/sample_yelp_data.js").businesses);
    });
  },
  pretendFetchDetail: function pretendFetchDetail(cb) {
    require.ensure([], function(require) {
      cb(null, require("./dev/sample_venue.js"));
    });
  },
  pretendFetchIsGoing: function pretendFetchIsGoing(cb) {
    require.ensure([], function(require) {
      cb(null, require("./dev/sample_is_going_to.js"));
    });
  }
};

module.exports = request;
