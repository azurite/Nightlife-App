const React = require("react");
const ReactDOM = require("react-dom");

const HelloWorld = React.createClass({
  render: function() {
    return (
      <h1>Hello World!</h1>
    );
  }
});

ReactDOM.render(<HelloWorld/>, document.getElementById("app"));
