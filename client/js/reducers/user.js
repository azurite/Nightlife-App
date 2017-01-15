const types = require("../actions/types");

const user = function(state, action) {
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      return action.user;

    default:
      return state;
  }
};

module.exports = user;
