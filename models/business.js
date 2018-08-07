const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BusinessSchema = new Schema({
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
    type: String,
    required: true
  },
  campaigns: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Campaign'
    }
  ]
})

let Business = mongoose.model('Business', BusinessSchema)

module.exports = Business
