const bcrypt = require('bcrypt')
//models to authenticate
const User = require('../models/user')
const Business = require('../models/business')

const config = require('../config')
const jwtUtils = require('../utils/jwt')

//check if user exists
function startUserAuthenticationFlow(user, password, cb) {
  if (!user) {
    return cb(new Error('No user found matching supplied email'))
  }
  verifyUserPassword(user.password, password, cb)
}

//verify password
function verifyUserPassword(hashedPassword, suppliedPassword, setUserCredentialsCallback) {
  if (!hashedPassword || !suppliedPassword) {
    return setUserCredentialsCallback(new Error('Authentication failed'))
  }
  bcrypt.compare(suppliedPassword, hashedPassword, (err, authenticated) => {
    if (err) {
      return setUserCredentialsCallback(new Error('Authenticaiton failed'));
    }
    setUserCredentialsCallback(null, authenticated)
  });
}

module.exports = {
  login: (req, res) => {
    const { email, password } = req.body
    User.findOne({ email })
      .then((user) => {
        startUserAuthenticationFlow(user, password, (err, authenticated) => {
          if (err || !authenticated) {
            return res.status(403).json({ message: 'Authentication failed' })
          }
          const token = jwtUtils.createToken(user)

          res.json({ success: true, message: 'Successfully logged in!', token })
        });
      })
      .catch((err) => {
        throw err;
      })
  },
  logout: (req, res) => {
    req.user = undefined;
    res.json({ success: true, message: 'You have successfully logged out' })
  }
}
