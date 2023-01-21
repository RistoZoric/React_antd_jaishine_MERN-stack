const mongoose = require('mongoose');

const Offer = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  sub_category: {
    type: String
  },
  status: {
    type: String
  },
  amount: {
    type: String
  },
  color: {
    type: String
  },
  ean: {
    type: String
  },
  info: {
    type: String
  },
  location: {
    type: String
  },
  material: {
    type: String
  },
  price: {
    type: String
  },
  restriction: {
    type: String
  },
  sale: {
    type: String
  },
  size: {
    type: String
  },
  track: {
    type: String
  },
  ve: {
    type: String
  },
  image: {
    type: String
  },
  file: {
    type: String
  },
  active: {
    type: Number,
    default: 1
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('offer', Offer);
