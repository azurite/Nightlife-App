const React = require("react");
const { Img, Col } = require("react-bootstrap");

const VenueCard = function(props) {
  return (
    <div className="venue-card">
      <Col xs={3}>
        <Img src={props.image_url} responsive circle className="venue-card vc-img"/>
      </Col>
      <Col xs={9}>
        <h3 className="venue-card vc-name">{props.name}</h3>
        <p className="venue-card vc-snippet">{props.snippet_text}</p>
      </Col>
    </div>
  );
};

VenueCard.propTypes = {
  image_url: React.PropTypes.string,
  name: React.PropTypes.string,
  snippet_text: React.PropTypes.string
};

module.exports = VenueCard;
