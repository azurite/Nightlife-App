const React = require("react");
const { connect } = require("react-redux");
const { Navbar, Nav, NavItem, Img } = require("react-bootstrap");
const { LinkContainer, IndexLinkContainer } = require("react-router-bootstrap");

const App = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    user: React.PropTypes.object
  },
  dynamicMenu: function() {
    if(this.props.user) {
      return (
        <Nav pullRight>
          <LinkContainer to={"/user/" + this.props.user.username}>
            <NavItem>
              {this.props.user.username}
              <Img circle responsive src={this.props.user.image_url}/>
            </NavItem>
          </LinkContainer>
        </Nav>
      );
    }
    else {
      return (
        <Nav pullRight>
          <LinkContainer to="/login">
            <NavItem>Login</NavItem>
          </LinkContainer>
        </Nav>
      );
    }
  },
  render: function() {
    return (
      <div id="app-data-root">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>Food-out</Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <IndexLinkContainer to="/"><NavItem>Home</NavItem></IndexLinkContainer>
            </Nav>
            {this.dynamicMenu()}
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
});

const mapStateToProps = function(state) {
  return {
    user: state.user
  };
};

const AppContainer = connect(
  mapStateToProps
)(App);

module.exports = AppContainer;
