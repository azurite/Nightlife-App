const React = require("react");
const { Link }  = require("react-router");
const { Grid, Row, Col, Form, FormGroup, FormControl, Button } = require("react-bootstrap");

const User = React.createClass({
  render: function() {
    return (
      <Grid fluid>
        <Row>
          <Col md={4} sm={8} xs={10} mdOffset={4} smOffset={2} xsOffset={1}>
            <div className="email-login">
              <h3 className="text-center login-title">Login with your email address</h3>
              <Form>
                <FormGroup>
                  <FormControl type="email" placeholder="email"/>
                </FormGroup>
                <FormGroup>
                  <FormControl type="password" placeholder="password"/>
                </FormGroup>
                <FormGroup>
                  <Button className="btn-red">Sign In</Button>
                  <Link to="/register">
                    <Button className="btn-red align-right">Register</Button>
                  </Link>
                </FormGroup>
              </Form>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={4} sm={8} xs={10} mdOffset={4} smOffset={2} xsOffset={1}>
            <div className="social-login">
              <h3 className="text-center login-title">Login with social media</h3>
              <Button className="btn-red" block>
                Login with Twitter <i className="fa fa-twitter"></i>
              </Button>
              <Button className="btn-red" block>
                Login with Github <i className="fa fa-github"></i>
              </Button>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = User;
