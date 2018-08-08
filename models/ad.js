const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adSchema = new Schema({
  campaignId: {
    type: Schema.Types.ObjectId,
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
  },
  clicks: {
    type: Number,
    default: 0
  }
})

const Ad = mongoose.model('Ad', adSchema)

module.exports = Ad
