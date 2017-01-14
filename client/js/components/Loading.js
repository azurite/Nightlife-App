const React = require("react");
const { Row, Col } = require("react-bootstrap");

const Loading = React.createClass({
  propTypes: {
    size: React.PropTypes.string
  },
  render: function() {
    return (
      <Row>
        <Col>
          <div className="loading-icon">
            <i className={"fa fa-spinner fa-spin " + this.props.size}></i>
          </div>
        </Col>
      </Row>
    );
  }
});

module.exports = Loading;
