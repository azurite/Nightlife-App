const types = require("../actions/types");
const Req = require("./redux-request");

const location_detail = function(state, action) {
  switch(action.type) {
    case types.FETCH_VENUE_DATA:
      return Object.assign({}, state, {
        venue: Req.begin(state.venue, false)
      });

    case types.VENUE_SUCCESS:
      return Object.assign({}, state, {
        venue: Req.done(state.venue, [action.venue], false)
      });

    case types.VENUE_ERROR:
      return Object.assign({}, state, {
        venue: Req.fail(state.venue, action.error, false)
      });

    default:
      return state;
  }
};

module.exports = location_detail;
