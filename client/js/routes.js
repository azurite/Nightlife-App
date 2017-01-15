const React = require("react");
const { Route, IndexRoute } = require("react-router");

const App = require("./components/App");
const Main = require("./components/Main");
const Login = require("./components/Login");
const Register = require("./components/Register");
const VenueDetail = require("./components/VenueDetail");
const User = require("./components/User");

const routes = function(store) {

  const delegateAuth = function(nextState, replaceState) {
    const state = store.getState();

    if(state.user) {
      replaceState({ pathname: "/user/" + state.user.username });
    }
  };

  const requireAuth = function(nextState, replaceState) {
    const state = store.getState();

    if(state.user === null) {
      replaceState({ pathname: "/login" });
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Main}/>
      <Route path="/login" component={Login} onEnter={delegateAuth}/>
      <Route path="/register" component={Register} onEnter={delegateAuth}/>
      <Route path="/venue/:id" component={VenueDetail}/>
      <Route path="/user/:username" component={User} onEnter={requireAuth}/>
    </Route>
  );
};

module.exports = routes;
