const React = require("react");
const { connect } = require("react-redux");
const { Grid, Row, Col, Button, Form, FormGroup, InputGroup, FormControl } = require("react-bootstrap");
const Venue = require("./VenueCard");
const ShowMore = require("./Paginate");
const Loading = require("./Loading");
const actions = require("../actions/main_search");
const Api = require("../request");

const Main = React.createClass({
  propTypes: {
    input_value: React.PropTypes.string.isRequired,
    yelp_results: React.PropTypes.object.isRequired,
    page: React.PropTypes.number.isRequired,
    handleChange: React.PropTypes.func.isRequired,
    submitSearch: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <Grid fluid>
        <Row>
          <Col md={6} sm={8} xs={10} mdOffset={3} smOffset={2} xsOffset={1}>
            <h1 className="title-main">Where are you going tonight?</h1>
            <Form onSubmit={this.props.submitSearch.bind(this, false, this.props.page, this.props.input_value)}>
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon><i className="fa fa-search"></i></InputGroup.Addon>
                  <FormControl
                    type="text"
                    name="query"
                    placeholder="City or Province"
                    value={this.props.input_value}
                    onChange={this.props.handleChange}
                  />
                  <InputGroup.Button>
                    <Button type="submit" className="btn-red">Go!</Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col md={6} sm={8} xs={10} mdOffset={3} smOffset={2} xsOffset={1}>
            {
              this.props.yelp_results.success &&
              this.props.yelp_results.data.length === 0 &&
              <p className="text-center text-white">no results</p>
            }
            {this.props.yelp_results.data.map((v, i) => {
              return (
                <Venue
                  key={i}
                  id={v.id}
                  name={v.name}
                  image_url={v.image_url}
                  snippet_text={v.snippet_text}
                />
              );
            })}
            {
              this.props.yelp_results.isPending &&
              this.props.yelp_results.data.length === 0 &&
              <Loading size="fa-3x"/>
            }
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center show-more">
            {
              this.props.yelp_results.data.length !== 0 &&
              <ShowMore
                onClick={this.props.submitSearch.bind(this, true, this.props.page, this.props.input_value)}
                isLoading={this.props.yelp_results.isPending}
              />
            }
          </Col>
        </Row>
      </Grid>
    );
  }
});

const mapStateToProps = (state) => {
  const part = state.mainSearch;
  return {
    input_value: part.nightlife_location,
    yelp_results: part.yelp_results,
    page: part.page
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (e) => {
      dispatch(actions.updateInput(e.target.value));
    },
    submitSearch: (paginate, page, value, e) => {
      e.preventDefault();
      if(value === "") {
        return;
      }
      dispatch(actions.submitSearch(paginate));

      var opt = {
        limit: 10,
        offset: paginate ? page * 10 : 0,
        location: value
      };

      Api.real.fetchYelp(opt, (err, data) => {
        if(err) {
          return dispatch(actions.submitFailure(err, paginate));
        }
        dispatch(actions.submitSuccess(data, paginate));
      });
    }
  };
};

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

module.exports = MainContainer;
