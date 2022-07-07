const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    req: [true, 'name is required'],
    unique: [true]
  },
  description_short: {
    type: String,
    minLengh: 30
  },
  desciption_long: {
    type: String
  },
  price: {
    type: Number,
    req: true,
    min: 1
  },
  image: String, // I use only 1 image for simplicity
  ratings: Number, // Use number instead of decimal/float bc idk how to set decimal in mongo
  size: Number,
  recommendation: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema)