const router = require('express').Router()
const adsController = require('../controllers/AdController')

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

router.route('/snatch').post(adsController.snatch)

// Create a route right off the domain '/:mRoute' that finds the ad with that mRoute,
// adds 1 to the clicks, then redirects the browser to the url for the same ad

module.exports = router
