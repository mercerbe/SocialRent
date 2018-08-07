//dependencies
const http = require('http')
const app = require('./app')

//set port
const PORT = process.env.PORT || 3001

//server listen
http.createServer(app).listen(PORT, () => {
  console.log('Server listening on PORT ' + PORT + ' , started at ' + (new Date()).toLocaleString())
})
