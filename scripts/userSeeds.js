//seed data for dev
const mongoose = require('mongoose')
const db = require('../models')

//connect to db -- hosted or local
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialrent_db')

//seed users
const userSeed = [
  {
    handle: 'sparkuscodes',
    email: 'sparkus@gmail.com',
    password: 'userTest',
    about: 'WOOF!'
  }, {
    handle: 'urban_coder',
    email: 'patrick.howard@gmail.com',
    password: 'userTest',
    about: 'only the best.'
  }, {
    handle: 'mkommar',
    email: 'mahesh.kommareddi@gmail.com',
    password: 'userTest',
    about: 'don\'t listen to urban_coder, I\'m the best.'
  }, {
    handle: 'fully_coded',
    email: 'mattt@gmail.com',
    password: 'userTest',
    about: 'I\'m a nerd and I don\'t care who knows'
  }, {
    handle: 'romeokilo125',
    email: 'romeokilo125@gmail.com',
    password: 'userTest',
    about: 'almost perfect in every way'
  }
]

function seedUser() {
  db.User.remove({}).then(() => db.User.collection.insertMany(userSeed)).then(data => {
    console.log(data.result.n + ' users added')
    process.exit(0)
  }).catch(err => {
    console.log('error', err)
    process.exit(1)
  })
}

seedUser()