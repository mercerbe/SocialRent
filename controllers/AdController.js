const Ad = require('../models/ad')
const Campaign = require('../models/campaign')
const User = require('../models/user')

const charArray => {
  let arr = []
  for (i = 30; i < 40; i++){
    arr.push(String.fromCharcode(i))
  }
  for (i = 65; i < 91; i++){
    arr.push(String.fromCharcode(i))
  }
  for (i = 97; i < 122; i++){
    arr.push(String.fromCharcode(i))
  }
  return arr
}
const generateRoute(arr, len) => {
  let route = []
  for (i = 0; i < len; i++) {
    let rand = Math.floor(Math.random() * arr.length)
    route.push(arr[rand])
  }
  return route.join('')
}

function createMRoute() {
  let chars = charArray()
  let route = ''
  do {
    route = ''
    route = generateRoute(chars, 8)
    unique = Ad.findOne({mRoute: route}, (err, result) => (result))
  } while (!unique);
  return route
}

// Defining CRUD methods for the adsController
module.exports = {
  // Get all ads
  findAll: function(req, res) {
    Ad.find(req.query)
    // Sort ads by ending soon to just posted
    .sort({ endDate: -1 })
    .then(ad => res.json(ad))
    .catch(err => res.status(422).json(err))
  },
  // Get a specific ad
  findById: function(req, res) {
    Ad.findById(req.params.id)
    .then(ad => res.json(ad))
    .catch(err => res.status(422).json(err))
  },
  // User agrees to a campaign and an ad
  snatch: function(req, res) {
    const { userId, campaignId } = req.body
    Campaign.findOneAndUpdate( {_id: campaignId}, { $push: { users: userId }}, { new: true} )
    .then((dbCamp) => {
      const { _id, headline, copy, url, startDate, endDate } = dbCamp
      Ad.create({
        campaignId: _id,
        copy,
        startDate,
        endDate,
        url,
        route: createMRoute()
      })
      .then((dbAd) => {
        User.findOneAndUpdate({  _id: userId }, { $push: { ads: dbAd._id }}, { new: true }).then(updatedUser => {
          res.json(updatedUser)
        })
      }).catch(err => res.status(422).json(err))
    })
  },
  // Update an ad
  update: function(req, res) {
    Ad.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(ad => res.json(ad))
    .catch(err => res.status(422).json(err))
  },
  // Delete an ad
  remove: function(req,res) {
    Ad.findById({ _id: req.params.id })
    .then(ad => ad.remove())
    .then(ad => res.json(campaign))
    .catch(err => res.status(422).json(err))
  }
}
