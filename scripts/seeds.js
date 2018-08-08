//seed data for dev
const mongoose = require('mongoose')
const db = require('../models')

//connect to db -- hosted or local
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/socialrent_db'
)

//seed users
const userSeed = [
  {
    handle: 'sparkuscodes',
    email: 'sparkus@gmail.com',
    password: 'userTest',
    about: 'WOOF!'
  },
  {
    handle: 'urban_coder',
    email: 'patrick.howard@gmail.com',
    password: 'userTest',
    about: 'only the best.'
  },
  {
    handle: 'mkommar',
    email: 'mahesh.kommareddi@gmail.com',
    password: 'userTest',
    about: 'don\'t listen to urban_coder, I\'m the best.'
  },
  {
    handle: 'fully_coded',
    email: 'mattt@gmail.com',
    password: 'userTest',
    about: 'I\'m a nerd and I don\'t care who knows'
  },
  {
    handle: 'romeokilo125',
    email: 'romeokilo125@gmail.com',
    password: 'userTest',
    about: 'almost perfect in every way'
  }
]

//seed businesses
const businessSeed = [
  {
    name: 'Tesla Motors',
    industry: 'Automotive',
    email: 'elon@tesla.com',
    password: 'businessTest',
    about: 'Vehicles of the future!'
  },
  {
    name: 'Apple',
    industry: 'Technology',
    email: 'tim@apple.com',
    password: 'businessTest',
    about: 'Computers of the future!'
  },
  {
    name: 'Wizards of the Coast',
    industry: 'Games & Hobbies',
    email: 'gregt@hasbro.com',
    password: 'businessTest',
    about: 'Games of the past!'
  }
]

// seed campaigns
const campaignSeed = [
  {
    headline: 'Tesla Model Y',
    copy: 'Tesla is proud to annouce a new vehicle joining our lineup, Models S, 3, and X. The Model Y is now available for pre-order. Get yours today!',
    url: 'https://www.tesla.com/semi',
    startDate: '2018-09-01',
    endDate: '2018-09-30'
  },
  {
    headline: 'Brand New iOS Device',
    copy: 'Apple made history today by showing off it\'s newest innovation. the iEye!',
    url: 'https://www.apple.com/',
    startDate: '2018-10-01',
    endDate: '2018-10-31'
  },
  {
    headline: 'Calling All Nerds',
    copy: 'The Tesla Model Y is now available for pre-order. Get yours today!',
    url: 'https://www.tesla.com/semi',
    startDate: '2018-09-01',
    endDate: '2018-09-30'
  }
]

//seed ads
const adSeed = [
  {
    title: 'Advertisement 1',
    body: 'Advertisement 1 for Nintendo, check out the switch!#switch #nintendo',
    date: new Date(Date.now())
  },
  {
    title: 'Advertisement 2',
    body: 'Advertisement 2 for Amazon: we already know what you want, we are always listening...#amazon #echo',
    date: new Date(Date.now())
  }
]

//seed scripts

db.Business
  .remove({})
  .then(() => db.Business.collection.insertMany(businessSeed))
  .then( data => {
    console.log(data.result.n + ' businesses added')
    process.exit(0)
  })
  .catch( err => {
    console.log('error', err)
    process.exit(1)
  })

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then( data => {
    console.log(data.result.n + ' users added')
    process.exit(0)
  })
  .catch( err => {
    console.log('error', err)
    process.exit(1)
  })

db.Campaign
  .remove({})
  .then(() => db.Campaign.collection.insertMany(campaignSeed))
  .then( data => {
    console.log(data.result.n + ' campaigns added')
    process.exit(0)
  })
  .catch( err => {
    console.log('error', err)
    process.exit(1)
  })

// db.Ad
//   .remove({})
//   .then(() => db.Ad.collection.insertMany(adSeed))
//   .then( data => {
//     console.log(data.result.n + ' ads added')
//     process.exit(0)
//   })
//   .catch( err => {
//     console.log('error:', err)
//     process.exit(1)
//   })
