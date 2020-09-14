const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
  firstName: {
    type: String,
    required: true,
  },
  lastName:{
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true
  },
  date:{
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false
  },
  school: {
    type: String,
    required: true,
    default: ''
  },
  profession: {
    type: String,
    default: ''
  },
  ethnicity: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  interests: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  }

})

const User = mongoose.model('User', userSchema);

module.exports = User;