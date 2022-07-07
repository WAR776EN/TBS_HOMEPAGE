const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
  title: {
    type: String,
    req: [true, 'title is required']
  },
  startDate: Date,
  endDate: Date,
  description_short: String,
  description_long: String,
  image: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Campaign', CampaignSchema)