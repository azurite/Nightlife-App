const React = require("react");
const { Grid } = require("react-bootstrap");

const Main = React.createClass({
  render: function() {
    return (
      <Grid fluid>
        <h1>Test</h1>
      </Grid>
    );
  }
});

module.exports = Main;
