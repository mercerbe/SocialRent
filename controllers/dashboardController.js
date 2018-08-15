const User = require('../models/user')
const Business = require('../models/business')
//set up to find business by Id

module.exports = {
  index: (req, res, next) => {
    if(req.user.id) {
    User.findById(req.user.id)
      .then(user => res.json({ user }))
      .catch(err => next(err));
    } else {
      Business.findById(req.user.id)
        console.log(req.user.id)
        .then( business => res.json({business}))
        .catch(err => next(error))

    }
  }
}
