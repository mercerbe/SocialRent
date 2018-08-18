const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')


const today = () => (moment().utc().startOf('day').toISOString())

const CampaignSchema = new Schema({
  headline: {
    type: String,
    required: true
  },
  copy: {
    type: String,
    required: true,
    min: [
      10, 'Too few characters.'
    ],
    max: [260, 'Leave room for the link!']
  },
  url: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true,
    default: today(),
    validate: {
      validator: function(v) {
        return v >= today()
      },
      message: "Your campaign cannot start in the past."
    }
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(v) {
        return v > this.startDate
      },
      message: "End date must be after start date."
    }
  },
  businessId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Business'
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  createdAt: {
    type: Date,
    required: true,
    default: today()
  }
})

let Campaign = mongoose.model('Campaign', CampaignSchema)

module.exports = Campaign
