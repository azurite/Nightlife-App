const React = require("react");
const { connect } = require("react-redux");
const { Link }  = require("react-router");
const { Grid, Row, Col, Form, FormGroup, FormControl, Button } = require("react-bootstrap");
const actions = require("../actions/login");
const Api = require("../request");

const User = React.createClass({
  propTypes: {
    email: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
    submit: React.PropTypes.object.isRequired,
    update: React.PropTypes.func.isRequired,
    login: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <Grid fluid>
        <Row>
          <Col md={4} sm={8} xs={10} mdOffset={4} smOffset={2} xsOffset={1}>
            <div className="email-login">
              <h3 className="text-center login-title">Login with your email address</h3>
              <Form onSubmit={this.props.login}>
                <FormGroup>
                  <FormControl
                    type="email"
                    placeholder="email"
                    value={this.props.email}
                    onChange={this.props.update.bind(this, "email")}
                  />
                </FormGroup>
                <FormGroup>
                  <FormControl
                    type="password"
                    placeholder="password"
                    value={this.props.password}
                    onChange={this.props.update.bind(this, "password")}
                  />
                </FormGroup>
                <FormGroup>
                  <Button type="submit" className="btn-red" disabled={this.props.submit.isPending}>
                    {this.props.submit.isPending ? "Loading..." : "Sign In"}
                  </Button>
                  {
                    this.props.submit.error &&
                    <span className="err-msg">{this.props.submit.error.message}</span>
                  }
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

const mapStateToProps = (state) => {
  return {
    email: state.login.email,
    password: state.login.password,
    submit: state.login.submit
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    update: (field, e) => {
      dispatch(actions.updateLoginInput(field, e.target.value));
    },
    login: (e) => {
      e.preventDefault();
      let info = {
        email: e.target[0].value,
        password: e.target[1].value
      };

      if(info.email === "" || info.password === "") {
        return;
      }
      dispatch(actions.submitLogin());
      Api.real.loginUser(info, (err, user) => {
        if(err) {
          return dispatch(actions.loginError(err));
        }
        dispatch(actions.loginSuccess(user));
        ownProps.router.push("/user/" + user.username);

        dispatch(actions.updateLoginInput("email", ""));
        dispatch(actions.updateLoginInput("password", ""));
      });
    }
  };
};

const UserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

module.exports = UserContainer;
