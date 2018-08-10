const router = require('express').Router()
const adsController = require('../../controllers/adsController')

// Matches with "/api/ads"
// Find all ads
// Business can create an ad

router.route('/')
 .get(adsController.findAll)
 .post(adsController.create)

// Matches with "/api/ads/:id"
// Finds a specific ad
// Business can update an ad
// Users also update the clicks field on an ad?
// Business can delete an ad

router.route('/:id')
  .get(adsController.findById)
  .put(adsController.update)
  .delete(adsController.remove)

module.exports = router