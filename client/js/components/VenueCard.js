const React = require("react");
const { Link } = require("react-router");
const { Image, Row, Col } = require("react-bootstrap");

const VenueCard = function(props) {
  return (
    <Link to={"/venue/" + props.id}>
      <div className="venue-card">
        <Row>
          <Col xs={3}>
            <Image src={props.image_url} responsive circle className="venue-card vc-img"/>
          </Col>
          <Col xs={9}>
            <h3 className="venue-card vc-name">{props.name}</h3>
            <p className="venue-card vc-snippet">{props.snippet_text || "No description"}</p>
          </Col>
        </Row>
      </div>
    </Link>
  );
};

VenueCard.propTypes = {
  image_url: React.PropTypes.string,
  name: React.PropTypes.string,
  snippet_text: React.PropTypes.string,
  id: React.PropTypes.string.isRequired
};

module.exports = VenueCard;
