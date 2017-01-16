const types = require("../actions/types");

const user = function(state, action) {
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      return action.user;

    case types.REGISTER_SUCCESS:
      return action.user;

    case types.LOGOUT_SUCCESS:
      return null;

    default:
      return state;
  }
};

module.exports = user;
