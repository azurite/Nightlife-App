const types = require("./types");

module.exports = {
  updateRegisterInput: function(field, value) {
    return {
      type: types.UPDATE_REGISTER_INPUT,
      field: field,
      value: value
    };
  },
  register: function() {
    return {
      type: types.REGISTER
    };
  },
  registerSuccess: function(user) {
    return {
      type: types.REGISTER_SUCCESS,
      user: user
    };
  },
  registerError: function(err) {
    return {
      type: types.REGISTER_ERROR,
      error: err
    };
  }
};
