// Main starting point for our app
const express = require("express"),
  http = require("http"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  app = express(),
  router = require("./router"),
  mongoose = require("mongoose"),
  cors = require("cors")

// DB setup
mongoose.connect("mongodb://localhost:27017/auth", { useMongoClient: true })

// App setup with express middlewares
app.use(morgan("combined"))
app.use(cors())
app.use(bodyParser({ type: "*/*" }))
router(app)

// Server setup
const port = process.env.PORT || 3090,
  server = http.createServer(app)

server.listen(port, console.log(`Server listening to port: ${port}`))
