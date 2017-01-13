const React = require("react");
const { Link } = require("react-router");
const { Grid, Row, Col, Button, Image } = require("react-bootstrap");
const Venue = require("./Display");
const sample = require("../dev/sample_user");

const User = React.createClass({
  render: function() {
    return (
      <Grid fluid>
        <Row>
          <Col sm={8} xs={10} smOffset={2} xsOffset={1} className="user-profile">
            <Row>
              <Col sm={4} xs={12} className="user-info">
                <Image src={sample.image_url} circle responsive/>
              </Col>
              <Col sm={8} xs={12} className="user-center-title">
                <h1 className="title-main">{sample.username}</h1>
                <Button className="btn-red btn-edge border-white">Logout</Button>
                <Button className="btn-red btn-edge border-white">Delete Account</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="last-row">
          <Col sm={8} xs={10} smOffset={2} xsOffset={1} className="is-going-list">
            <h3 className="text-center">Venues you are currently going to</h3>
            {sample.currently_going_to.map((v, i) => {
              return (
                <Link to="/venue/old-crow-zürich">
                  <Venue key={i} url={v.image_url} name={v.name}/>
                </Link>
              );
            })}
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = User;
