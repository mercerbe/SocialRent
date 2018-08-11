//dependencies
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

//set express
const app = express()

//config
const config = require('./config')

// connect to database
mongoose.connect(
  process.env.MONGO_URI || config.mongoURI,
  { useNewUrlParser: true }
)

//bring in routes
const apiRoutes = require('./routes/api')
//Ben bringing this in
//const campaignRoutes = require('./routes/campaigns')

// Serve static files from the built React app
app.use(express.static(path.join(__dirname, 'client/build')))

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//set express to use imported routes
app.use('/api', apiRoutes)

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

//handle errors
const handleUnexpectedError = (err, req, res, next) => {
  console.log('Unexpected error: ' + JSON.stringify(err))
  res.sendStatus(500)
}

app.use(handleUnexpectedError)

module.exports = app
