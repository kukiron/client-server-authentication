import React from "react"
import { Route } from "react-router-dom"

import Signin from "./auth/Signin"
import Signup from "./auth/Signup"
import Signout from "./auth/Signout"
import RequireAuth from "./auth/RequireAuth"
import Feature from "./Feature"
import Home from "./Home"

const App = () => {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/singin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/signout" component={Signout} />
      <Route path="/feature" component={RequireAuth(Feature)} />
    </div>
  )
}

export default App
