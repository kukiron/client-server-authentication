const passport = require("passport"),
  Authentication = require("./controllers/authentication")

require("./services/passport")

const requireAuth = passport.authenticate("jwt", { session: false }),
  requireSignIn = passport.authenticate("local", { session: false })

module.exports = function(app) {
  app.get("/", requireAuth, (req, res) => {
    res.send({ message: "Super secret code is 123ABC" })
  })
  app.post("/signin", requireSignIn, Authentication.signin)
  app.post("/signup", Authentication.signup)
}
