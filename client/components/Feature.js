import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchData } from "../actions"

class Feature extends Component {
  componentWillMount() {
    this.props.fetchData()
  }

  render() {
    return (
      <div className="feature">
        <h4>This is the previledged page</h4>
        <img src="public/images/nature-mountain.jpg" alt="Nature Mountain" />
        <img src="public/images/nature-fountain.png" alt="Nature Fountain" />
        <div className="message">{this.props.message}</div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth: { message } }) => {
  return { message }
}

export default connect(mapStateToProps, { fetchData })(Feature)
