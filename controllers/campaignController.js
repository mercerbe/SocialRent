const Campaign = require('../models/campaign');

// CRUD methods for campaignController
module.exports = {
  // Get all campaigns
  findAll: function(req, res) {
    Campaign.find(req.query)
    // Sort campaigns by ending soon to just posted
    .sort({ endDate: -1})
    .then(campaign => res.json(campaign))
    .catch(err => res.status(422).json(err))
  },
  // Get a specific campaign
  findById: function(req, res) {
    Campaign.findById(req.params.id)
    .then(campaign => res.json(campaign))
    .catch(err => res.status(422).json(err))
  },
  // Business creates a campaign
  create: function(req, res) {
    Campaign.create(req.body)
    .then(campaign => res.json(campaign))
    .catch(err => res.status(422).json(err))
  },
  // Update a campaign
  update: function(req, res) {
    Campaign.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(campaign => res.json(campaign))
    .catch(err => res.status(422).json(err))
  },
  // Delete a campaign
  remove: function(req, res) {
    Campaign.findById({ _id: req.params.id })
    .then(campaign => campaign.remove())
    .then(campaign => res.json(campaign))
    .catch(err => res.status(422).json(err))
  }
}
