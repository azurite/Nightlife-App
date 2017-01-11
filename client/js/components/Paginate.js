const React = require("react");
const { Button } = require("react-bootstrap");

const Paginate = function(props) {
  return (
    <Button onClick={props.onClick} className="btn-red" disabled={props.isLoading}>
      {(props.isLoading && "Loading...") || "Show More"}
    </Button>
  );
};

Paginate.propTypes = {
  isLoading: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
};

module.exports = Paginate;
