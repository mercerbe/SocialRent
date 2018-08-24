const Ad = require('../models/ad')
const Campaign = require('../models/campaign')

module.exports = {
  // mRoute will find the ad with that mRoute,
  // add 1 to the clicks, then redirects the browser to the url for the same ad
  mRoute: function(req, res) {
    console.log(`routing: ${req.params.mRoute}`)
    Ad.findOneAndUpdate({ mRoute: req.params.mRoute}, {$inc: {clicks: 1}}, {new: true}).then(dbAd => {
      console.log(dbAd.campaignId)
      Campaign.findOneAndUpdate({_id: dbAd.campaignId}, {$inc: {totalClicks: 1}}).then(() => {
        res.redirect(dbAd.url)
      })
    })
  }
}
