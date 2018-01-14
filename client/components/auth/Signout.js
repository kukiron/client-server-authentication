import React, { Component } from "react"
import { connect } from "react-redux"
import { signOutUser } from "../../actions"

class Signout extends Component {
  componentWillMount() {
    this.props.signOutUser()
  }

  render() {
    return <h2>Sorry to see you go...</h2>
  }
}

export default connect(null, { signOutUser })(Signout)
