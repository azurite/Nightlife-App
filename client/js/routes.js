const React = require("react");
const { Route, IndexRoute } = require("react-router");

const App = require("./components/App");
const Main = require("./components/Main");
const Login = require("./components/Login");

const routes = function(store) {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Main}/>
      <Route path="/login" component={Login}/>
    </Route>
  );
};

module.exports = routes;
