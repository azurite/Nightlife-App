const React = require("react");
const { Link } = require("react-router");
const { connect } = require("react-redux");
const { Grid, Row, Col, Image, Button } = require("react-bootstrap");
const Loading = require("./Loading");
const User = require("./Display");
const actions = require("../actions/venue_detail");
const Api = require("../request.js");
const Req = require("../reducers/redux-request");

const VenueDetail = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    venue: React.PropTypes.object.isRequired,
    isLoggedIn: React.PropTypes.bool.isRequired,
    isAlsoGoing: React.PropTypes.object.isRequired,
    userIsGoing: React.PropTypes.bool.isRequired,
    fetchVenueAndIsGoing: React.PropTypes.func.isRequired,
    fetchIsGoing: React.PropTypes.func.isRequired
  },
  componentDidMount: function() {
    if(!this.props.venue.data[0]) {
      this.props.fetchVenueAndIsGoing(this.props.isLoggedIn);
      return;
    }
    if(this.props.isLoggedIn) {
      this.props.fetchIsGoing();
    }
  },
  render: function() {
    let venue = this.props.venue;
    let vData = venue.data[0];
    let users = this.props.isAlsoGoing;
    let isLoggedIn = this.props.isLoggedIn;
    let userIsGoing = this.props.userIsGoing;
    return (
      <Grid fluid>
          <Row>
            <Col sm={8} xs={10} smOffset={2} xsOffset={1} className="venue-detail">
              {venue.isPending && <Loading size="fa-3x"/>}
              {
                vData &&
                <Row>
                  <Col sm={4} xs={12} className="venue-info">
                    <Image src={vData.image_url} circle responsive/>
                    <a href={"tel:" + vData.phone}>
                      <Button className="btn-red btn-block btn-edge">
                        <i className="fa fa-phone"></i> {vData.display_phone}
                      </Button>
                    </a>
                    <a href={"https://maps.google.com/?q=" + vData.location.display_address.join()} target="_blank">
                      <Button className="btn-red btn-block btn-edge">
                        Show on Map <i className="fa fa-map-marker"></i>
                      </Button>
                    </a>
                  </Col>
                  <Col sm={8} xs={12} className="v-center-title">
                    <h1 className="title-main">{vData.name}</h1>
                    <Button className="btn-red btn-edge border-white align-right">
                      {userIsGoing ? "Remove" : "Go there tonight"}
                    </Button>
                  </Col>
                </Row>
              }
              {
                !vData &&
                <Row>
                  <Col xs={12} className="v-center-title">
                    <h1 className="title-main">Sorry :( We couldn't find your venue</h1>
                    <Link to="/">
                      <Button className="btn-red btn-edge border-white align-right">Find Venues</Button>
                    </Link>
                  </Col>
                </Row>
              }
            </Col>
          </Row>
          <Row className="last-row">
            <Col sm={8} xs={10} smOffset={2} xsOffset={1} className="is-going-list">
              {
                !isLoggedIn &&
                <h3 className="text-center user-list-title loggedout">
                  <Link to="/login">Login</Link> to see who is going
                </h3>
              }
              {users.isPending && <Loading size="fa-2x" color="red"/>}
              {
                isLoggedIn && users.success &&
                <h3 className="text-center user-list-title">{users.data.length} people are going there tonight</h3>
              }
              {
                isLoggedIn &&
                users.data.map((u, i) => {
                  return <User key={i} url={u.image_url} name={u.username}/>;
                })
              }
            </Col>
          </Row>
      </Grid>
    );
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    venue: (() => {
      let loadVenue = state.location_detail.venue;

      if(loadVenue.data[0] && loadVenue.data[0].id === ownProps.params.id) {
        return loadVenue;
      }
      loadVenue = state.mainSearch.yelp_results.data.find((v) => {
        return v.id === ownProps.params.id;
      });

      if(loadVenue) {
        return Req.done(Req.init(), [loadVenue], false);
      }

      return Req.init();
    })(),
    isAlsoGoing: state.location_detail.is_also_going,
    isLoggedIn: !!state.user,
    userIsGoing: !!(state.user && state.user.isGoingTo.find((v) => {
      return v.id === ownProps.params.id;
    }))
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchVenueAndIsGoing: function(isLoggedIn) {
      dispatch(actions.fetchVenueData());
      Api.pretendFetchDetail(ownProps.params.id, (err, venue) => {
        if(err) {
          return dispatch(actions.venueError(err));
        }
        dispatch(actions.venueSuccess(venue));
        if(isLoggedIn && venue) {
          this.fetchIsGoing();
        }
      });
    },
    fetchIsGoing: function() {
      dispatch(actions.fetchIsGoing());
      Api.pretendFetchIsGoing((err, users) => {
        if(err) {
          return dispatch(actions.isGoingError(err));
        }
        dispatch(actions.isGoingSuccess(users));
      });
    }
  };
};

const VenueDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VenueDetail);

module.exports = VenueDetailContainer;