const Req = require("./redux-request");

const initialState = {
  mainSearch: {
    nightlife_location: "",
    yelp_results: Req.init(),
    page: 0
  },
  location_detail: {
    venue: Req.init(),
    is_also_going: Req.init(),
    add_remove: Req.init()
  },
  login: {
    email: "",
    password: "",
    submit: Req.init()
  },
  register: {
    fullName: "",
    email: "",
    password: "",
    submit: Req.init()
  },
  user: null,
  logout: Req.init()
};

module.exports = initialState;
