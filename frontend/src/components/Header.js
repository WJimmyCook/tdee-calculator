import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { isAuthenticated } from '../reducers'
import { logOut } from '../actions/auth'
import { bindActionCreators } from 'redux'

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
        <nav>
          <a href="/logout" onClick={this.logOut}>log out</a>
        </nav>
      );
    } else {
      return (
        <nav>
          <Link to="/login" activeClassName="active">
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
