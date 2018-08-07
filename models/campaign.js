const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CampaignSchema = new Schema({
  headline: {
    type: String,
    required: true
  },
  copy: {
    type: String,
    required: true,
    min: [10, 'Too few characters.'],
    max: [260, 'Leave room for the link!']
  },
  url: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
    validate: {
      validator: function(v) {
      return v >= Date.now
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
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

let Campaign = mongoose.model('Campaign', CampaignSchema)

module.exports = Campaign
