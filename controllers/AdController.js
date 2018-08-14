const Ad = require('../models/ad')
const Campaign = require('../models/campaign')
const User = require('../models/user')

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
      let route = "route goes here"
      Ad.create({
        campaignId: _id,
        copy,
        startDate,
        endDate,
        url,
        route
      })
      .then((dbAd) => {
        User.findOneAndUpdate({  _id: userId }, { $push: { ads: dbAd._id }}, { new: true }).then(updatedUser => {
          res.json(updatedUser).populate('ads')
        })
      }).catch(err => res.status(422).json(err))
    })
  },
  // mRoute will find the ad with that mRoute,
  // add 1 to the clicks, then redirects the browser to the url for the same ad
  mRoute: function(req, res) {
    Ad.findOneAndUpdate( { _id: req.params.id }, req.body.mRoute) // Not sure if this how to reference mRoute properly
      .then(ad => ad.clicks += 1) // update clicks for ad
      .then(ad => res.redirect('ads/:mRoute')) // then redirect
      .catch(err => res.status(422).json(err))
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
