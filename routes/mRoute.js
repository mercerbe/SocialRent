const router = require('express').Router()
const mRouter = require('../controllers/mRouteController')

router.route('/:mRoute')
  .get(adsController.mRoute)
