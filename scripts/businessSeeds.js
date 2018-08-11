//seed data for dev
const mongoose = require('mongoose')
const db = require('../models')

//connect to db -- hosted or local
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialrent_db')

//seed businesses
const businessSeed = [
  {
    name: 'Tesla Motors',
    industry: 'Automotive',
    email: 'elon@tesla.com',
    password: 'businessTest',
    about: 'Vehicles of the future!'
  }, {
    name: 'Apple',
    industry: 'Technology',
    email: 'tim@apple.com',
    password: 'businessTest',
    about: 'Computers of the future!'
  }, {
    name: 'Wizards of the Coast',
    industry: 'Games & Hobbies',
    email: 'gregt@hasbro.com',
    password: 'businessTest',
    about: 'Games of the past!'
  }
]

function seedBusiness() {
  db.Business.remove({}).then(() => db.Business.collection.insertMany(businessSeed)).then(data => {
    console.log(data.result.n + ' businesses added')
    process.exit(0)
  }).catch(err => {
    console.log('error', err)
    process.exit(1)
  })
}

seedBusiness()