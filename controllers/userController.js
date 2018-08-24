const User = require('../models/user')

module.exports = {
  // create new user route
  create: (req, res, next) => {
    const { type, handle, email, password, about } = req.body
    console.log(req.body)
    User.create({
      handle,
      email,
      password,
      about
    })
      .then((user) => {
        console.log(user)
        res.json({ status: 200, message: 'User created!', user: user });
      })
      .catch(err => next(err))
  },
  findById: (req, res, next) => {
    User.findById(req.user.id)
      .populate('ads')
      .then(user => res.json({ user, success: true, message: 'User Found' }))
      .catch(err => next(err))
  }
}
