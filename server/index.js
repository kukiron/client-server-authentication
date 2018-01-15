// Imports
const express = require("express"),
  http = require("http"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  router = require("./router")

const app = express()

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

// Listening to the port
server.listen(port, console.log(`Server listening to port: ${port}`))
