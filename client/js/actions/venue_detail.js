const types = require("./types");

module.exports = {
  fetchVenueData: function() {
    return {
      type: types.FETCH_VENUE_DATA
    };
  },
  venueSuccess: function(venue) {
    return {
      type: types.VENUE_SUCCESS,
      venue: venue
    };
  },
  venueError: function(err) {
    return {
      type: types.VENUE_ERROR,
      error: err
    };
  }
};
