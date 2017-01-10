const React = require("react");

const VenueDetail = React.createClass({
  propTypes: {
    params: React.PropTypes.object
  },
  render: function() {
    return (
      <h1>Venue Detail View of: {this.props.params.id}</h1>
    );
  }
});

module.exports = VenueDetail;
