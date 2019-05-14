const mongoose = require("mongoose");

const UserTypes = {
  // admin = 0,
  // cleaner = 1,
  // user = 2
  userType: {
    type: String,
    required: true
  }
};
// TODO: userType не нужен наверное, так как для каждого типа своя скима
const UserSchema = new mongoose.Schema({
  // userType: {
  //   type: UserTypes,
  //   required: true
  // },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  registration_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
