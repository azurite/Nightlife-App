const React = require("react");
const { Route, IndexRoute } = require("react-router");

const sample = require("./dev/sample_venue");

const App = require("./components/App");
const Main = require("./components/Main");
const Login = require("./components/Login");
const Register = require("./components/Register");
const VenueDetail = require("./components/VenueDetail");
const User = require("./components/User");

const routes = function(store) {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Main}/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/venue/:id" component={VenueDetail} sample={sample}/>
      <Route path="/user/:username" component={User}/>
    </Route>
  );
};

module.exports = routes;
