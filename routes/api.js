//express router
const router = require('express').Router()

//token util
const jwtUtils = require('../utils/jwt')

//controllers
const UserController = require('../controllers/UserController')
const AuthController = require('../controllers/AuthController')
const DashboardController = require('../controllers/DashboardController')
//BRING IN BUSINESS CONTROLLER AND SET UP ROUTES

router.route('/user')
  .get(jwtUtils.verify, UserController.findById, handleAuthFailure)
  .post(UserController.create)

router.route('/register')
  .post(UserController.create)

router.route('/login')
  .post(AuthController.login)

router.route('/logout')
  .get(AuthController.logout)


// ----- routes protected by jwt below here ----- //
function handleAuthFailure(err, req, res, next) {
  res.status(403).json({ success: false, message: 'Authentication failed' })
}

router.route('/dashboard')
  .get(jwtUtils.verify, DashboardController.index, handleAuthFailure)

module.exports = router
