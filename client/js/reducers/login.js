const types = require("../actions/types");
const Req = require("./redux-request");

const login = function(state, action) {
  switch(action.type) {
    case types.UPDATE_LOGIN_INPUT:
      return Object.assign({}, state, {
        [action.field]: action.value
      });

    case types.SUBMIT_LOGIN:
      return Object.assign({}, state, {
        submit: Req.begin(state.submit, false)
      });

    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        submit: Req.done(state.submit, [], false)
      });

    case types.LOGIN_FAILURE:
      return Object.assign({}, state, {
        submit: Req.fail(state.submit, action.error, false)
      });

    default:
      return state;
  }
};

module.exports = login;
