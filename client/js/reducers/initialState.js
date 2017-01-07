const Req = require("./redux-request");

const initialState = {
  mainSearch: {
    nightlife_location: "",
    req: Req.init()
  },
  locationDetail: {
    is_also_going: Req.init()
  },
  profile: null
};

module.exports = initialState;
