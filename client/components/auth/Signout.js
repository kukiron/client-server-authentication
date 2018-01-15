import React, { Component } from "react"
import { connect } from "react-redux"
import { signOutUser } from "../../actions"

class Signout extends Component {
  componentWillMount() {
    this.props.signOutUser()
  }

  render() {
    return (
      <div className="sign-out">
        <h2>Sorry to see you go...</h2>
        <img src="public/images/signout.gif" alt="Sorry to see you go" />
      </div>
    )
  }
}

export default connect(null, { signOutUser })(Signout)
