const Ad = require('../models/ad')

module.exports = {
  // mRoute will find the ad with that mRoute,
  // add 1 to the clicks, then redirects the browser to the url for the same ad
  mRoute: function(req, res) {
    console.log(`routing: ${req.params.mRoute}`)
    Ad.findOneAndUpdate({ mRoute: req.params.mRoute}, {$inc: {clicks: 1}}, {new: true}).then(dbAd => res.json(dbAd.url))
  }
}
