const User = require('../models/user')
const Business = require('../models/business')
//set up to find business by Id

module.exports = {
  index: (req, res, next) => {
    User.findById(req.user.id)
      .then(user => res.json({ user }))
      .catch(err => next(err));
  }
}
