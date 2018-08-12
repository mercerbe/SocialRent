const router = require('express').Router()
const adsController = require('../controllers/adController')

// Matches with "/api/ads"
// Find all ads
// Business can create an ad

router.route('/').get(adsController.findAll)

// Matches with "/api/ads/:id"
// Finds a specific ad
// Business can update an ad
// Users also update the clicks field on an ad?
// Business can delete an ad

router.route('/:id').get(adsController.findById).put(adsController.update).delete(adsController.remove)

router.route('/ad/snatch').post(adsController.snatch)

module.exports = router
