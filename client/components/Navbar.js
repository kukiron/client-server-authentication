import React, { Component } from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"

class Navbar extends Component {
  // Navbar for users not signed-in/signed-up
  unauthenticatedUser() {
    return [
      <li className="navbar-item" key={1}>
        <NavLink to="/singin" className="selected">
          Sign In
        </NavLink>
      </li>,
      <li className="navbar-item" key={2}>
        <NavLink to="/signup" className="selected">
          Sign Up
        </NavLink>
      </li>
    ]
  }

  // Navbar for signed in users
  authenticatedUser() {
    return (
      <li className="navbar-item">
        <NavLink to="/signout" className="selected">
          Sign Out
        </NavLink>
      </li>
    )
  }

  render() {
    const { authenticated } = this.props

    return (
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li className="navbar-item">
            <NavLink to="/" className="selected">
              Home
            </NavLink>
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
