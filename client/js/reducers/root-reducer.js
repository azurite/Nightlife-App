const mainSearch = require("./main_search");
const location_detail = require("./location_detail");

const root_reducer = function(state, action) {
  return {
    mainSearch: mainSearch(state.nightlife_location, action),
    location_detail: location_detail(state.location_detail, action)
  };
};

module.exports = root_reducer;
