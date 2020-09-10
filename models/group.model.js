const mongoose = require('mongoose');
const userSchema = require('./user.model').schema;

const groupSchema = new mongoose.Schema ({
  groupName: {
    type: String,
    required: true,
    unique: true
  },
  admin: [userSchema],
  users: [userSchema]
})

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;