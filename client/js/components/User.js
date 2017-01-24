const React = require("react");
const { connect } = require("react-redux");
const { Link } = require("react-router");
const { Grid, Row, Col, Button, Image } = require("react-bootstrap");
const Venue = require("./Display");
const Api = require("../request");
const actions = require("../actions/user");

const User = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired,
    logoutStats: React.PropTypes.object.isRequired
  },
  render: function() {
    let user = this.props.user;
    let logout = this.props.logoutStats;
    return (
      <Grid fluid>
        <Row>
          <Col sm={8} xs={10} smOffset={2} xsOffset={1} className="user-profile">
            <Row>
              <Col sm={4} xs={12} className="user-info">
                <Image src={user.image_url} circle responsive/>
              </Col>
              <Col sm={8} xs={12} className="user-center-title">
                <h1 className="title-main">{user.name}</h1>
                <Button className="btn-red btn-edge border-white" disabled={logout.isPending} onClick={this.props.logout}>
                  {logout.isPending ? "Loading..." : "Logout"}
                </Button>
                <Button className="btn-red btn-edge border-white">Delete Account</Button>
                {
                  logout.error &&
                  <span className="err-msg">{logout.error.message}</span>
                }
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="last-row">
          <Col sm={8} xs={10} smOffset={2} xsOffset={1} className="is-going-list">
            {
              user.isGoingTo &&
              <h3 className="text-center">
                {user.isGoingTo.length === 0 ? "You are not going anywhere tonight" : "Venues you are currently going to"}
              </h3>
            }
            {user.isGoingTo && user.isGoingTo.map((v) => {
              return (
                <Link key={v.id} to={"/venue/" + v.id}>
                  <Venue url={v.image_url} name={v.name}/>
                </Link>
              );
            })}
          </Col>
        </Row>
      </Grid>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.user || {},
    logoutStats: state.logout
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: function() {
      dispatch(actions.logout());
      Api.logoutUser((err) => {
        if(err) {
          return dispatch(actions.logoutError(err));
        }
        dispatch(actions.logoutSuccess());
        ownProps.router.push("/login");
      });
    }
  };
};

const UserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

module.exports = UserContainer;
