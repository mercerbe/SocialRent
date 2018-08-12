const router = require('express').Router()
const campaignController = require('../controllers/campaignController')

// Find all campaigns
// Business creates a campaign
router.route('/campaign')
  .get(campaignController.findAll)
  .post(campaignController.create)

// Matches with "/api/campaigns/:id"
// Finds a specific campaign
// Business can update a campaign
// Business can remove a campaign

router.route('/:id')
  .get(campaignController.findById)
  .put(campaignController.update)
  .delete(campaignController.remove)

module.exports = router