const types = require("../actions/types");
const Req = require("./redux-request");

const logout = function(state, action) {
  switch(action.type) {
    case types.LOGOUT:
      return Req.begin(state, false);

    case types.LOGOUT_SUCCESS:
      return Req.done(state, [], false);

    case types.LOGOUT_ERROR:
      return Req.fail(state, action.error, false);

    default:
      return state;
  }
};

module.exports = logout;
