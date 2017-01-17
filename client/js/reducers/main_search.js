const types = require("../actions/types");
const Req = require("./redux-request");

const mainSearch = function(state, action) {
  switch(action.type) {
    case types.UPDATE_INPUT:
      return Object.assign({}, state, {
        nightlife_location: action.input
      });

    case types.SUBMIT_SEARCH:
      return Object.assign({}, state, {
        yelp_results: Req.begin(state.yelp_results, action.paginate)
      });

    case types.SUBMIT_SUCCESS:
      return Object.assign({}, state, {
        page: action.paginate ? state.page + 1 : 1,
        yelp_results: Req.done(state.yelp_results, action.venues, action.paginate)
      });

    case types.SUBMIT_FAILURE:
      return Object.assign({}, state, {
        yelp_results: Req.fail(state.yelp_results, action.error, action.paginate)
      });

    default:
      return state;
  }
};

module.exports = mainSearch;
