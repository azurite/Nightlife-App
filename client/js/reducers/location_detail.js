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

    case types.FETCH_IS_GOING:
      return Object.assign({}, state, {
        is_also_going: Req.begin(state.is_also_going, false)
      });

    case types.IS_GOING_SUCCESS:
      return Object.assign({}, state, {
        is_also_going: Req.done(state.is_also_going, action.users, false)
      });

    case types.IS_GOING_ERROR:
      return Object.assign({}, state, {
        is_also_going: Req.fail(state.is_also_going, action.error, false)
      });

    case types.GOTO_OR_REMOVE:
      return Object.assign({}, state, {
        add_remove: Req.begin(state.add_remove, false)
      });

    case types.GOTO_OR_REMOVE_SUCCESS:
      var curr = state.is_also_going.data;
      return Object.assign({}, state, {
        add_remove: Req.done(state.add_remove, [], false),
        is_also_going: {
          ...state.is_also_going,
          data: action.method === "add" ?
          curr.concat({
            id: action.user.id,
            username: action.user.username,
            image_url: action.user.image_url
          }) :
          curr.filter((user) => {
            return user.id !== action.user.id;
          })
        }
      });

    case types.GOTO_OR_REMOVE_ERROR:
      return Object.assign({}, state, {
        add_remove: Req.fail(state.add_remove, action.error, false)
      });

    default:
      return state;
  }
};

module.exports = location_detail;
