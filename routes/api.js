//express router
const router = require('express').Router()

//token util
const jwtUtils = require('../utils/jwt')

//controllers
const UserController = require('../controllers/userController')
const AuthController = require('../controllers/authController')
const DashboardController = require('../controllers/dashboardController')
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
router.route('/user/login')
  .post(AuthController.userlogin)

router.route('/logout')
  .get(AuthController.userlogout)

router.route('/business/login')
  .post(AuthController.businesslogin)

router.route('/logout')
  .get(AuthController.businesslogout)

// ----- routes protected by jwt below here ----- // -- this is where it's failing...
function handleAuthFailure(err, req, res, next) {
  res.status(403).json({ success: false, message: 'Authentication failed' })
}

router.route('/dashboard')
  .get(jwtUtils.verify, DashboardController.index, handleAuthFailure)

module.exports = router
