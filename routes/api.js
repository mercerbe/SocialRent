//express router
const router = require('express').Router()

//token util
const jwtUtils = require('../utils/jwt')

//controllers
const UserController = require('../controllers/UserController')
const AuthController = require('../controllers/AuthController')
const DashboardController = require('../controllers/DashboardController')
const BusinessController = require('../controllers/businessController')

//User routes
router.route('/user')
  .get(jwtUtils.verify, UserController.findById, handleAuthFailure)
  .post(UserController.create)

router.route('/user/register')
  .post(UserController.create)

//business routes
router.route('/business')
  .get(jwtUtils.verify, BusinessController.findById, handleAuthFailure)
  .post(BusinessController.create)

router.route('/business/register')
  .post(BusinessController.create)

//auth login/logout routes
router.route('/login')
  .post(AuthController.userlogin)

router.route('/logout')
  .get(AuthController.userlogout)

router.route('/login')
  .post(AuthController.businesslogin)

router.route('/logout')
  .get(AuthController.businesslogout)

// ----- routes protected by jwt below here ----- //
function handleAuthFailure(err, req, res, next) {
  res.status(403).json({ success: false, message: 'Authentication failed' })
  console.log('Authentication Failure.')
}

router.route('/dashboard')
  .get(jwtUtils.verify, DashboardController.index, handleAuthFailure)

module.exports = router
