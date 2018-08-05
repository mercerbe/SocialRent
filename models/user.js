const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  handle: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: string,
    required: true
  }
  ads: [
    {
      type: Schema.types.ObjectId,
      ref: 'Ad'
    }
  ]
})

let User = mongoose.model('User', UserSchema)

module.exports = User
