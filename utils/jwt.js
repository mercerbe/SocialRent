const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = {
  createToken: (user) => {
    const payload = {
      id: user.id
    };
    const token = jwt.sign(
      payload,
      process.env.SECRET || config.secret,
      {
        expiresIn: '12h' // expires in 12 hours
      }
    )
    return token
  },

  verify: (req, res, next) => {
    const authHeader = req.headers.authorization || ''
    const token = authHeader.split('Bearer ')[1]
    const authenticated = jwt.verify(token, config.secret)
    if (authenticated) {
      req.user = jwt.decode(token)
      next()
    } else {
      res.status(403).json({ success: false, message: 'jwt: Forbidden' })
    }
  }
}
