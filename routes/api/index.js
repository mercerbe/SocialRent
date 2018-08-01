const router = require('express').Router()
const adRoutes = require('./ads')
const userRoutes = require('./users')

//todo: confirm we want these routes loaded when we land on main page
// ad routes
router.use('/', adRoutes)
//user routes
router.use('/', userRoutes)

module.exports = router
