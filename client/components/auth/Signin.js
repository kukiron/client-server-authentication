import React, { Component } from "react"
import { connect } from "react-redux"
import { reduxForm, Field } from "redux-form"
import { Link } from "react-router-dom"

import { authenticateUser } from "../../actions"

class Signin extends Component {
  renderField({ label, input }) {
    const type = input.name === "password" ? "password" : "text"

    return (
      <div className="form-group">
        <label>{label}</label>
        <input type={type} className="form-control" {...input} />
      </div>
    )
  }

  renderAlert() {
    const { signinErrorMsg } = this.props

    if (signinErrorMsg) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong>&nbsp;
          {signinErrorMsg}
        </div>
      )
    }
  }

  onFormSubmit({ email, password }) {
    const { history, authenticateUser } = this.props
    authenticateUser("signin", { email, password, history })
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
        <Field label="Email" name="email" component={this.renderField} />
        <Field label="Password" name="password" component={this.renderField} />
        {this.renderAlert()}
        <button className="btn btn-primary" type="submit">
          Sign In
        </button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    )
  }
}

const mapStateToProps = ({ auth: { signinErrorMsg } }) => {
  return { signinErrorMsg }
}

export default reduxForm({
  form: "signin"
})(connect(mapStateToProps, { authenticateUser })(Signin))
