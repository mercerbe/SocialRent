const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdSchema = new Schema({
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
  mRoute: {
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
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Ad', AdSchema)
