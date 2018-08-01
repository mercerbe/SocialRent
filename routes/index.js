//this file is for dev or production routes
//if no local api routes are hit, use the react build to route

//dependencies
const path = require('path')
const router = require('express').router()
const routes = require('./api')//will grab index in api folder, combining all our routes

//routes we're requiring 
router.use('./api', routes)

//route to build
router.use( (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})
