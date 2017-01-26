const types = require("./types");

module.exports = {
  toggleModal: function() {
    return {
      type: types.TOGGLE_MODAL
    };
  },
  deleteAccount: function() {
    return {
      type: types.DELETE_ACCOUNT
    };
  },
  deleteAccountSuccess: function(status) {
    return {
      type: types.DELETE_ACCOUNT_SUCCESS,
      status: status
    };
  },
  deleteAccountError: function(err) {
    return {
      type: types.DELETE_ACCOUNT_ERROR,
      error: err
    };
  }
};
