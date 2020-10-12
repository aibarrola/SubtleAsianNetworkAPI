const mongoose = require('mongoose');
const userSchema = require('./user.model').schema;
const postSchema = require('./post.model').schema;

const groupSchema = new mongoose.Schema ({
  groupName: {
    type: String,
    required: true,
    unique: true
  },
  description:{
    type: String,
    required: true
  },
  links:[String],
  posts: [postSchema],
  admin: [{type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'}],
  users: [{type: mongoose.Schema.Types.ObjectId, 
          ref: 'User'}]
})

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;