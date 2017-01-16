const mainSearch = require("./main_search");
const location_detail = require("./location_detail");
const login = require("./login");
const register = require("./register");
const user = require("./user");
const logout = require("./logout");

const root_reducer = function(state, action) {
  return {
    mainSearch: mainSearch(state.mainSearch, action),
    location_detail: location_detail(state.location_detail, action),
    login: login(state.login, action),
    register: register(state.register, action),
    user: user(state.user, action),
    logout: logout(state.logout, action)
  };
};

module.exports = root_reducer;
