const React = require("react");
const { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button } = require("react-bootstrap");

const Register = React.createClass({
  render: function() {
    return (
      <Grid fluid>
        <Row>
          <Col md={4} sm={8} xs={10} mdOffset={4} smOffset={2} xsOffset={1}>
            <h3 className="text-center login-title">Register with email</h3>
            <Form>
              <FormGroup>
                <ControlLabel className="label-red">Full Name</ControlLabel>
                <FormControl type="text" placeholder="eg. Bob Ross"/>
              </FormGroup>
              <FormGroup>
                <ControlLabel className="label-red">Email</ControlLabel>
                <FormControl type="email" placeholder="bobross@painting.com"/>
              </FormGroup>
              <FormGroup>
                <ControlLabel className="label-red">Password</ControlLabel>
                <FormControl type="password" placeholder="password"/>
              </FormGroup>
              <FormGroup>
                <Button className="btn-red">Sign Up</Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = Register;
