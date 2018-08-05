const mongoose = require('mongoose')
const Schema = mongoose.Schema

const businessSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  industry: {
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
  campaigns: [
    {
      type: Schema.types.ObjectId,
      ref: 'Campaign'
    }
  ]
})

let Business = mongoose.model('Business', BusinessSchema)

module.exports = Business
