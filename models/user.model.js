const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
  firstName: {
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  birthDate:{
    type: Date,
    // required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  school: {
    type: String,
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
  },
  register_date: {
    type: Date,
    default: Date.now
  }

})

const User = mongoose.model('User', userSchema);

module.exports = User;