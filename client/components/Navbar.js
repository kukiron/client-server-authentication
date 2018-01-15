import React, { Component } from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"

class Navbar extends Component {
  // Navbar for users not signed-in/signed-up
  unauthenticatedUser() {
    return [
      <li className="navbar-item" key={1}>
        <NavLink to="/singin">Sign In</NavLink>
      </li>,
      <li className="navbar-item" key={2}>
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    ]
  }

  // Navbar for signed in users
  authenticatedUser() {
    return (
      <li className="navbar-item">
        <NavLink to="/signout">Sign Out</NavLink>
      </li>
    )
  }

  render() {
    const { authenticated } = this.props

    return (
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li className="navbar-item">
            <NavLink to="/">Home</NavLink>
          </li>
          {authenticated
            ? this.authenticatedUser()
            : this.unauthenticatedUser()}
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(Navbar)
