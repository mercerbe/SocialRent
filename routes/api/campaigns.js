const router = require('express').Router()
const campaignController = require('../../controllers/campaignController')

router.route('/')
  .get(campaignController.findAll)
  .post(campaignController.create)

module.exports = router
