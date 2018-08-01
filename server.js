//dependencies
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
//access all routes
const routes = require('./routes')
const app = express()
const PORT = process.env.PORT || 8080

//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//for production deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));//fix this path for build
}

//use all routes from routes folder as defined by routes/express router
app.use(routes)

// Connect to db - either production mlab hosted or local
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/socialrent_db");

//start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})
