//seed data for dev
const mongoose = require('mongoose')
const models = require('../models')

//connect to db -- hosted or local
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/socialrent_db'
)

//seed users
const userSeed = [
  {
    handle: 'sparkuscodes',
    email: 'sparkus@gmail.com',
    password: 'userTest'
  },
  {
    handle: 'urban_coder',
    email: 'patrick.howard@gmail.com',
    password: 'userTest'
  },
  {
    handle: 'mkommar',
    email: 'mahesh.kommareddi@gmail.com',
    password: 'userTest'
  },
  {
    handle: 'fully_coded',
    email: 'mattt@gmail.com',
    password: 'userTest'
  },
  {
    handle: 'romeokilo125',
    email: 'romeokilo125@gmail.com',
    password: 'userTest'
  }
]

//seed businesses
const businessSeed = [
  {
    name: 'Tesla Motors',
    industry: 'Automotive',
    email: 'elon@tesla.com',
    password: 'businessTest'
  },
  {
    name: 'Apple',
    industry: 'Technology',
    email: 'tim@apple.com',
    password: 'businessTest'
  },
  {
    name: 'Wizards of the Coast',
    industry: 'Games & Hobbies',
    email: 'gregt@hasbro.com',
    password: 'businessTest'
  }
]

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
models.User
  .remove({})
  .then(() => models.User.collection.insertMany(userSeed))
  .then( data => {
    console.log(data.result.n + 'users added')
    process.exit(0)
  })
  .catch( err => {
    console.log('error', err)
    process.exit(1)
  })

models.Ad
  .remove({})
  .then(() => models.Ad.collection.insertMany(adSeed))
  .then( data => {
    console.log(data.result.n + 'ads added')
    process.exit(0)
  })
  .catch( err => {
    console.log('error:', err)
    process.exit(1)
  })
