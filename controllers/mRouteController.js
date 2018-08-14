const Ad = require('../models/ad')

module.exports = {
  // mRoute will find the ad with that mRoute,
  // add 1 to the clicks, then redirects the browser to the url for the same ad
  mRoute: function(req, res) {
    Ad.findOneAndUpdate({_id: req.params.mRoute}, {$inc: {clicks: 1}}, {new: true}).then(dbAd => res.redirect(dbAd.url))
  }
}
