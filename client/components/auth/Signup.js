import React, { Component } from "react"
import { connect } from "react-redux"
import { reduxForm, Field } from "redux-form"
import { Link } from "react-router-dom"

import { authenticateUser } from "../../actions"

class Signup extends Component {
  renderField({ label, input, meta: { touched, error } }) {
    const type = input.name === "email" ? "text" : "password"

    return (
      <div className="form-group">
        <label>{label}</label>
        <input type={type} className="form-control is-invalid" {...input} />
        {touched && error && <div className="error">{error}</div>}
      </div>
    )
  }

  renderAlert() {
    const { signupErrorMsg } = this.props

    if (signupErrorMsg) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong>&nbsp;
          {signupErrorMsg}
        </div>
      )
    }
  }

  onFormSubmit({ email, password }) {
    const { history, authenticateUser } = this.props
    authenticateUser("signup", { email, password, history })
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
        <Field label="Email" name="email" component={this.renderField} />
        <Field label="Password" name="password" component={this.renderField} />
        <Field
          label="Confirm Password"
          name="passwordConfirm"
          component={this.renderField}
        />
        {this.renderAlert()}
        <button className="btn btn-success" type="submit">
          Create Account
        </button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    )
  }
}

const validate = ({ email, password, passwordConfirm }) => {
  const errors = {}

  !email && (errors.email = "Enter an email")
  !password && (errors.password = "Enter a password")
  !passwordConfirm && (errors.passwordConfirm = "Confirm your password")
  password !== passwordConfirm && (errors.password = "Passwords must match")

  return errors
}

const mapStateToProps = ({ auth: { signupErrorMsg } }) => {
  return { signupErrorMsg }
}

export default reduxForm({
  form: "singup",
  validate
})(connect(mapStateToProps, { authenticateUser })(Signup))
