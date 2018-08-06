const router = require('express').Router()
const adsController = require('../../controllers/adsController')

// FINISH THIS BY SATURDAY
//api routes will go here
router.route('/')
 .get(adsController.findAll)
 .post(adsController.create)


module.exports = router
