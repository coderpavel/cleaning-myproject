const mongoose = require("mongoose");

const CleanerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  middlename: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  registration_date: {
    type: Date,
    default: Date.now
  },
  customer_rating: {
    type: Number,
    default: 0
  },
  address: {
      type: String,
      required: true
  }
});
module.exports = User = mongoose.model("cleaner", CleanerSchema);
