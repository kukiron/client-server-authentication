import {
  AUTH_USER,
  UNAUTH_USER,
  SIGNIN_ERROR,
  SIGNUP_ERROR,
  FETCH_DATA
} from "../actions/constants"

export default (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case AUTH_USER:
      return { ...state, error: "", authenticated: true }

    case UNAUTH_USER:
      return { ...state, authenticated: false }

    case SIGNIN_ERROR:
      return { ...state, signinErrorMsg: payload }

    case SIGNUP_ERROR:
      return { ...state, signupErrorMsg: payload }

    case FETCH_DATA:
      return { ...state, message: payload }
  }

  return state
}
