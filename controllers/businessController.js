const Business = require('../models/business')

module.exports = {
  // create new business route
  create: (req, res, next) => {
    const { name, email, password } = req.body
    Business.create({
      name,
      email,
      password
    })
      .then((business) => {
        console.log(business)
        res.json({ status: 200, message: 'User created!', business: business });
      })
      .catch(err => next(err))
  },
  //find business
  findById: (req, res, next) => {
    Business.findById(req.business.id)
      .then(business => res.json({ business, success: true, message: 'Business Found' }))
      .catch(err => next(err))
  }
}
