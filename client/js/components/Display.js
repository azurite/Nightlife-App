const React = require("react");
const { Image, Button } = require("react-bootstrap");

const User = function(props) {
  return (
    <div className="is-going-user">
      <Image src={props.url} circle responsive/>
      <span>{props.name}</span>
      {props.is_going &&
        <Button bsSize="xsmall" className="btn-red btn-edge border-white align-right">
          Don't go anymore
        </Button>
      }
    </div>
  );
};

User.propTypes = {
  url: React.PropTypes.string,
  name: React.PropTypes.string,
  is_going: React.PropTypes.bool
};

module.exports = User;
