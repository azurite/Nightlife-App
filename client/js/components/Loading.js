const React = require("react");
const { Row, Col } = require("react-bootstrap");

const Loading = React.createClass({
  propTypes: {
    size: React.PropTypes.string,
    color: React.PropTypes.string
  },
  render: function() {
    return (
      <Row>
        <Col>
          <div className={"loading-icon icon-" + (this.props.color || "white")}>
            <i className={"fa fa-spinner fa-spin " + this.props.size}></i>
          </div>
        </Col>
      </Row>
    );
  }
});

module.exports = Loading;
