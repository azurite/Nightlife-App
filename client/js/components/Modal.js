const React = require("react");
const { Modal, Button } = require("react-bootstrap");

const Confirm = function(props) {
  return (
    <Modal show={props.visible} onHide={props.cancel}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger" onClick={props.confirm}>Confirm</Button>
        <Button onClick={props.cancel}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

Confirm.propTypes = {
  visible: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string,
  body: React.PropTypes.string,
  confirm: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired
};

module.exports = Confirm;
