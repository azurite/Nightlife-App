const React = require("react");
const { Image } = require("react-bootstrap");

const User = function(props) {
  return (
    <div className="is-going-user">
      <Image src={props.url} circle responsive/>
      <span>{props.name}</span>
    </div>
  );
};

User.propTypes = {
  url: React.PropTypes.string,
  name: React.PropTypes.string
};

module.exports = User;
