const types = require("./types");

module.exports = {
  logout: function() {
    return {
      type: types.LOGOUT
    };
  },
  logoutSuccess: function() {
    return {
      type: types.LOGOUT_SUCCESS
    };
  },
  logoutError: function(err) {
    return {
      type: types.LOGOUT_ERROR,
      error: err
    };
  }
};
