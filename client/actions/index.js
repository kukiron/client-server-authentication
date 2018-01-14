import axios from "axios"

import {
  AUTH_USER,
  UNAUTH_USER,
  SIGNIN_ERROR,
  SIGNUP_ERROR,
  FETCH_DATA
} from "./constants"

const ROOT_URL = "http://localhost:3090"

// Application state for the error cases
const singInError = error => {
  return {
    type: SIGNIN_ERROR,
    payload: error
  }
}

const signUpError = error => {
  return {
    type: SIGNUP_ERROR,
    payload: error
  }
}

export const authenticateUser = (endPoint, { email, password, history }) => {
  // Submit the user eamail & password
  const request = axios.post(`${ROOT_URL}/${endPoint}`, { email, password })

  return dispatch => {
    // If the creadentials are correct
    request
      .then(response => {
        // -> Update state to indicate that the user is authenticated
        dispatch({ type: AUTH_USER })
        // -> Save the JWT token
        localStorage.setItem("token", response.data.token)
        // -> Redirect the user to "/feature" route
        history.push("/feature")
      })
      .catch(err => {
        // If request is bad show the user an error message based on endpoint
        endPoint === "signin"
          ? dispatch(singInError("Bad login info"))
          : dispatch(signUpError(err.response.data.error))
      })
  }
}

// Remove the token & return unauthenticated state
export const signOutUser = () => {
  localStorage.removeItem("token")
  return { type: UNAUTH_USER }
}

// Authenticated request to the API server
export const fetchData = () => {
  const request = axios.get(ROOT_URL, {
    headers: { authorization: localStorage.getItem("token") }
  })

  return dispatch => {
    request.then(response => {
      dispatch({
        type: FETCH_DATA,
        payload: response.data.message
      })
    })
  }
}
