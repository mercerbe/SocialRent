//express router
const router = require('express').Router()

//token util
const jwtUtils = require('../utils/jwt')

//controllers
const usersController = require('../controllers/usersController')
const authController = require('../controllers/authController')
const dashboardController = require('../controllers/dashboardController')

router.route('/user')
  .get(jwtUtils.verify, usersController.findById, handleAuthFailure)
  .post(usersController.create)

router.route('/register')
  .post(usersController.create)

router.route('/login')
  .post(authController.login)

router.route('/logout')
  .get(authController.logout)


// ----- routes protected by jwt below here ----- //
function handleAuthFailure(err, req, res, next) {
  res.status(403).json({ success: false, message: 'Authentication failed' })
}

router.route('/dashboard')
  .get(jwtUtils.verify, dashboardController.index, handleAuthFailure)

module.exports = router
