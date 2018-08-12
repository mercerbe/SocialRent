const mongoose = require('mongoose')
const db = require('../models')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialrent_db')

const campaignSeed = [
    {
     headline: 'Come code with us!',
     copy: 'We are hiring at CoderBros!  Do you like being a douchebag know-it-all?  Then this is the environment for you!',
     url: 'http://www.coderbros.com/careers',
     startDate: '2019-01-23',
     endDate: '2020-12-25'
    }, {
    headline: 'Come jam with us!',
    copy: 'We are hiring at JammerBros!  Do you like being a douchebag know-it-all?  Then this is the environment for you!',
    url: 'http://www.jammerbros.com/careers',
    startDate: '2019-01-23',
    endDate: '2020-12-25'
    }, {
    headline: 'Come game with us!',
    copy: 'We are hiring at GamerBros!  Do you like being a douchebag know-it-all?  Then this is the environment for you!',
    url: 'http://www.gamerbros.com/careers',
    startDate: '2019-01-23',
    endDate: '2020-12-25'
    }
]

function seedCampaign() {
    db.Campaign.remove({}).then(() => db.Campaign.collection.insertMany(campaignSeed)).then(data => {
      console.log(data.result.n + ' users added')
      process.exit(0)
    }).catch(err => {
      console.log('error', err)
      process.exit(1)
    })
  }

  seedCampaign()