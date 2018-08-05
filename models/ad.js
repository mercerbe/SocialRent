const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdSchema = new Schema({
  campaignId: {
    type: Schema.types.ObjectId,
    required: true,
    ref: 'Campaign'
  },
  copy: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
  clicks: {
    type: Number,
    default: 0
  }
})

let Ad = mongoose.model('Ad', AdSchema)

module.exports = Ad
