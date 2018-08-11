const Ad = require('../models/ad')

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
  // Business creates an ad
  create: function(req, res) {
    Ad.create(req.body)
      .then(ad => res.json(ad))
      .catch(err => res.status(422).json(err))
  },
  // User creates an ad
  snatch: (req, res, next) => {
    let userId = req.params.id
    const { campaignId = _id, headline, copy, srcUrl = url, startDate, endDate } = req.body
    console.log(req.body)
    Ad.create({
      campaignId,
      copy,
      startDate,
      endDate,
      srcUrl
    })
      .then((dbAd) => {
        User.findOneAndUpdate({  _id: req.params.id }, { $push: { ads: dbAd._id }}, { new: true })
        Campaign.findOneAndUpdate({ _id: campaignId }, { $push: { users: userId }}, { new: true })
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