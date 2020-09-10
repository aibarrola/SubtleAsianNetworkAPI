const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
  firstName: {
    type: String,
    required: true,
    unique: true
  },
  lastName:{
    type: String,
    required: true,
    unique: true
  },
  hashedpassword: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  admin: {
    type: Boolean,
    default: false
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
module.exports = Comment;