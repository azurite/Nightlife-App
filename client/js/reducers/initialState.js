const Req = require("./redux-request");

const initialState = {
  mainSearch: {
    nightlife_location: "",
    yelp_results: Req.init()
  },
  location_detail: {
    is_also_going: Req.init()
  },
  user: null
};

module.exports = initialState;
