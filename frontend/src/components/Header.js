import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { isAuthenticated } from '../reducers'
import { logOut } from '../actions/auth'
import { bindActionCreators } from 'redux'
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

class Header extends React.Component {
  constructor(props){
    super();
    this.logOut = this.logOut.bind(this)
  }

  logOut = (event) => {
    console.log("in da header")
    event.preventDefault()
    this.props.logOutUser()
  }

  render() {
    if (this.props.isAuthenticated) {
      return (
        <Navbar color="faded" className="header">
          <NavbarBrand href="/">Adaptive TDEE</NavbarBrand>
            <Nav navbar>
              <NavItem>
                <NavLink href="/logout" className="logout" onClick={this.logOut}>log out</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      );
    } else {
      return (
        <nav>
          <Link to="/login" className="login" activeClassName="active">
            log in</Link>
        </nav>
        );
      }
    }
  }


const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state)
})
const mapDispatchToProps = (dispatch) => ({
  logOutUser: bindActionCreators(logOut, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Header);
