const React = require("react");
const { Route, IndexRoute } = require("react-router");
const actions = require("./actions/venue_detail");

const App = require("./components/App");
const Main = require("./components/Main");
const Login = require("./components/Login");
const Register = require("./components/Register");
const VenueDetail = require("./components/VenueDetail");
const User = require("./components/User");
const Social = require("./components/Social");

const routes = function(store) {

  const delegateAuth = function(nextState, replaceState) {
    const state = store.getState();

    if(state.user) {
      replaceState({ pathname: "/user/" + state.user.name });
    }
  };

  const requireAuth = function(nextState, replaceState) {
    const state = store.getState();

    if(state.user === null) {
      replaceState({ pathname: "/login" });
    }
  };

  const checkOAuth = function(nextState, replaceState) {
    const state = store.getState();

    if(state.user && state.user.loginMethod === nextState.params.social) {
      replaceState({ pathname: "/user/" + state.user.name });
    }
    else {
      replaceState({ pathname: "/login" });
    }
  };

  const reset = function() {
    store.dispatch(actions.resetOnLeave());
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Main}/>
      <Route path="/login" component={Login} onEnter={delegateAuth}/>
      <Route path="/register" component={Register} onEnter={delegateAuth}/>
      <Route path="/venue/:id" component={VenueDetail} OnLeave={reset}/>
      <Route path="/user/:username" component={User} onEnter={requireAuth}/>
      <Route path="/auth/:social/callback" component={Social} onEnter={checkOAuth}/>
    </Route>
  );
};

module.exports = routes;
