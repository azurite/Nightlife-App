const React = require("react");
const { Link } = require("react-router");
const { connect } = require("react-redux");
const { Grid, Row, Col, Image, Button } = require("react-bootstrap");
const Loading = require("./Loading");
//const User = require("./Display");
const actions = require("../actions/venue_detail");
const Api = require("../request.js");
const Req = require("../reducers/redux-request");

const VenueDetail = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    route: React.PropTypes.object,
    venue: React.PropTypes.object,
    fetchVenueData: React.PropTypes.func.isRequired
  },
  componentDidMount: function() {
    if(!this.props.venue.data[0]) {
      this.props.fetchVenueData();
    }
  },
  render: function() {
    let venue = this.props.venue;
    let vData = venue.data[0];
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
                    <Button className="btn-red btn-edge border-white align-right">Go there tonight</Button>
                  </Col>
                </Row>
              }
              {
                !vData &&
                <Row>
                  <Col xs={12} className="v-center-title">
                    <h1 className="title-main">Sorry :( We couldn't find your bar</h1>
                    <Link to="/">
                      <Button className="btn-red btn-edge border-white align-right">Find Bars</Button>
                    </Link>
                  </Col>
                </Row>
              }
            </Col>
          </Row>
          <Row className="last-row">
            <Col sm={8} xs={10} smOffset={2} xsOffset={1} className="is-going-list">
              {/*
              <h3 className="text-center">{venue.is_also_going.length} people are going there tonight</h3>
              {venue.is_also_going.map((u, i) => {
                return <User key={i} url={u.image_url} name={u.username}/>;
              })}
              */}
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
    })()
  };
};

const mapDispatchToProps = (dispatch/*, ownProps*/) => {
  return {
    fetchVenueData: () => {
      dispatch(actions.fetchVenueData());
      //use ownProps.params.id as query with the real request
      Api.pretendFetchDetail((err, venue) => {
        if(err) {
          return dispatch(actions.venueError(err));
        }
        dispatch(actions.venueSuccess(venue));
      });
    }
  };
};

const VenueDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VenueDetail);

module.exports = VenueDetailContainer;
