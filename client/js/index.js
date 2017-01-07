const React = require("react");
const { createStore } = require("redux");
const ReactDOM = require("react-dom");
const { Router, browserHistory } = require("react-router");
const { Provider } = require("react-redux");

const routes = require("./routes");
const reducer = require("./reducers/root-reducer");
const initialState = require("./reducers/initialState");

function getInitialState() {
  var state = window.__PRELOADED_STATE__;
  if(state) {
    if(typeof state === "string") {
      return JSON.parse(state);
    }
    if(typeof state === "object") {
      return state;
    }
  }
  return initialState;
}

const store = createStore(reducer, getInitialState());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes(store)}
    </Router>
  </Provider>,
  document.getElementById("app")
);
