//router and jwt
const router = require('express').Router()
const jwtUtils = require('../../utils/jwt')
//controllers
const usersController = require('../../controllers/usersController')

//user routes
router.route('/user')
  .get(jwtUtils.verify, UserController.findById, handleAuthFailure)
  .post(UserController.create)

router.route('/register')
  .post(UserController.create)

router.route('/login')
  .post(AuthController.login)

router.route('/logout')
  .get(AuthController.logout)


// ----- jwt routes  ----- //
function handleAuthFailure(err, req, res, next) {
  res.status(403).json({ success: false, message: 'Authentication failed' })
}

router.route('/dashboard')
  .get(jwtUtils.verify, DashboardController.index, handleAuthFailure)

module.exports = router
