const React = require("react");
const { Grid, Row, Col, Button, Form, FormGroup, InputGroup, FormControl } = require("react-bootstrap");

const Main = React.createClass({
  render: function() {
    return (
      <Grid fluid>
        <Row>
          <Col md={6} sm={8} xs={10} mdOffset={3} smOffset={2} xsOffset={1}>
            <h1 className="title-main">Where are you going tonight?</h1>
            <Form>
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon><i className="fa fa-search"></i></InputGroup.Addon>
                  <FormControl type="text" name="query"/>
                  <InputGroup.Button>
                    <Button className="btn-go bg-red">Go!</Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = Main;