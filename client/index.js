import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import reduxThunk from "redux-thunk"

import App from "./components/App"
import Navbar from "./components/Navbar"
import rootReducer from "./reducers"
import { AUTH_USER } from "./actions/constants"

const noMatch = ({ location }) => {
  return (
    <h5>
      No match for the path <code>{location.pathname}</code>
    </h5>
  )
}

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(rootReducer)
const token = localStorage.getItem("token")

// If we have a token, the user should be authenticated and app state updated
token && store.dispatch({ type: AUTH_USER })

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Navbar />
        <div className="container">
          <Switch>
            <Route path="/" component={App} />
            <Route component={noMatch} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)
