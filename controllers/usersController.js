const User = require('../models/User');

module.exports = {
  // create new user route
  create: (req, res, next) => {
    const { email, password } = req.body;
    User.create({
      handle,
      email,
      password
    })
      .then((user) => {
        res.json({ status: 200, message: 'User created!', user: user });
      })
      .catch(err => next(err))
  },
  findById: (req, res, next) => {
    User.findById(req.user.id)
      .then(user => res.json({ user, success: true, message: 'User Found' }))
      .catch(err => next(err))
  }
}
