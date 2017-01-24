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
  },
  fetchIsGoing: function() {
    return {
      type: types.FETCH_IS_GOING
    };
  },
  isGoingSuccess: function(users) {
    return {
      type: types.IS_GOING_SUCCESS,
      users: users
    };
  },
  isGoingError: function(err) {
    return {
      type: types.IS_GOING_ERROR,
      error: err
    };
  },
  goToVenueOrRemove: function() {
    return {
      type: types.GOTO_OR_REMOVE
    };
  },
  goToVenueOrRemoveSuccess: function(method, user) {
    return {
      type: types.GOTO_OR_REMOVE_SUCCESS,
      method: method,
      user: user
    };
  },
  goToVenueOrRemoveError: function(method, err) {
    return {
      type: types.GOTO_OR_REMOVE_ERROR,
      method: method,
      error: err
    };
  },
  resetOnLeave: function() {
    return {
      type: types.RESET_ON_LEAVE,
    };
  }
};
