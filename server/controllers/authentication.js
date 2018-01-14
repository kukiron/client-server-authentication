const jwt = require("jwt-simple"),
  config = require("../config"),
  User = require("../models/user")

const tokenForUser = user => {
  const timestamp = new Date().getTime()
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp
    },
    config.secret
  )
}

exports.signin = function(req, res) {
  /**
   * User has already had email & password auth'd
   * we just need to give them a token
   */
  res.send({ token: tokenForUser(req.user) })
}

exports.signup = function(req, res, next) {
  const email = req.body.email,
    password = req.body.password

  if (!email || !password)
    return res
      .status(422)
      .send({ error: "You must provide both email & password." })

  // see if a user with a given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) return next(err)

    // if so, return error
    if (existingUser) return res.status(422).send({ error: "Email is in use" })

    // if not, create & save user record
    const user = new User({
      email,
      password
    })

    // respond to request indicating the user was created
    user.save(err => {
      err ? next(err) : res.json({ token: tokenForUser(user) })
    })
  })
}
