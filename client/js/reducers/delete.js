const types = require("../actions/types");
const Req = require("./redux-request");

const Delete = function(state, action) {
  switch(action.type) {
    case types.TOGGLE_MODAL:
      return Object.assign({}, state, {
        modalOpen: !state.modalOpen
      });

    case types.DELETE_ACCOUNT:
      return Object.assign({}, state, {
        status: Req.begin(state.status, false)
      });

    case types.DELETE_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        status: Req.done(state.status, [action.status], false)
      });

    case types.DELETE_ACCOUNT_ERROR:
      return Object.assign({}, state, {
        status: Req.fail(state.status, action.error, false)
      });

    default:
      return state;
  }
};

module.exports = Delete;
