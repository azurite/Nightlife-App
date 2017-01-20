const types = require("../actions/types");
const Req = require("./redux-request");

const register = function(state, action) {
  switch(action.type) {
    case types.UPDATE_REGISTER_INPUT:
      return Object.assign({}, state, {
        [action.field]: action.value
      });

    case types.REGISTER:
      return Object.assign({}, state, {
        submit: Req.begin(state.submit, false)
      });

    case types.REGISTER_SUCCESS:
      return Object.assign({}, state, {
        fullName: "",
        email: "",
        password: "",
        submit: Req.done(state.submit, [], false)
      });

    case types.REGISTER_ERROR:
      return Object.assign({}, state, {
        submit: Req.fail(state.submit, action.error, false)
      });

    default:
      return state;
  }
};

module.exports = register;
