const mongoose = require("mongoose");

module.exports = Сustomer = mongoose.model(
  "Сustomer",
  new mongoose.Schema({
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
    ip: {
      type: String,
      required: true
    },
    device_registration: {
      type: String,
      required: true
    },
    last_visit_date: {
      type: Date,
      default: Date.now
    },
    customer_rating: {
      type: Number,
      default: 0
    }
  })
);
