const types = require("./types");

module.exports = {
  updateLoginInput: function(field, value) {
    return {
      type: types.UPDATE_LOGIN_INPUT,
      field: field,
      value: value
    };
  },
  submitLogin: function() {
    return {
      type: types.SUBMIT_LOGIN
    };
  },
  loginSuccess: function(user) {
    return {
      type: types.LOGIN_SUCCESS,
      user: user
    };
  },
  loginError: function(err) {
    return {
      type: types.LOGIN_ERROR,
      error: err
    };
  }
};
