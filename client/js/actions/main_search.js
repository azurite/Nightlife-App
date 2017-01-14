const types = require("./types.js");

module.exports = {
  updateInput: function(input) {
    return {
      type: types.UPDATE_INPUT,
      input: input
    };
  },
  submitSearch: function(paginate) {
    return {
      type: types.SUBMIT_SEARCH,
      paginate: paginate
    };
  },
  submitSuccess: function(venues, paginate) {
    return {
      type: types.SUBMIT_SUCCESS,
      venues: venues,
      paginate: paginate
    };
  },
  submitFailure: function(err, paginate) {
    return {
      type: types.SUBMIT_FAILURE,
      error: err,
      paginate: paginate
    };
  }
};
