const React = require("react");
const { Grid, Row, Col, Image, Button } = require("react-bootstrap");

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

const VenueDetail = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    route: React.PropTypes.object
  },
  googleMaps: function() {
    var baseUrl = "https://maps.google.com/?q=";
    return baseUrl + this.props.route.sample.display_address.join();
  },
  phone: function() {
    return "tel:" + this.props.route.sample.phone;
  },
  render: function() {
    var venue = this.props.route.sample;
    return (
      <Grid fluid>
          <Row>
            <Col sm={8} xs={10} smOffset={2} xsOffset={1} className="venue-detail">
              <Row>
                <Col sm={4} xs={12} className="venue-info">
                  <Image src={venue.image_url} circle responsive/>
                  <a href={this.phone()}>
                    <Button className="btn-red btn-block btn-edge">
                      <i className="fa fa-phone"></i> {venue.display_phone}
                    </Button>
                  </a>
                  <a href={this.googleMaps()} target="_blank">
                    <Button className="btn-red btn-block btn-edge">
                      Show on Map <i className="fa fa-map-marker"></i>
                    </Button>
                  </a>
                </Col>
                <Col sm={8} xs={12} className="v-center-title">
                  <h1 className="title-main">{venue.name}</h1>
                  <Button className="btn-red btn-edge border-white align-right">Go there tonight</Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="last-row">
            <Col sm={8} xs={10} smOffset={2} xsOffset={1} className="is-going-list">
              <h3 className="text-center">{venue.is_also_going.length} people are going there tonight</h3>
              {venue.is_also_going.map((u, i) => {
                return <User key={i} url={u.image_url} name={u.username}/>;
              })}
            </Col>
          </Row>
      </Grid>
    );
  }
});

module.exports = VenueDetail;
