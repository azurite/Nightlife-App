const nightlife_location = require("./nightlife_location");
const location_detail = require("./location_detail");

const root_reducer = function(state, action) {
  return {
    nightlife_location: nightlife_location(state.nightlife_location, action),
    location_detail: location_detail(state.location_detail, action)
  };
};

module.exports = root_reducer;
