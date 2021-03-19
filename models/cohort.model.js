const mongoose = require('mongoose');
const User = require('./user.model');

const cohertSchema = new mongoose.Schema({
  cohortName: {
    type: String,
    required: true
  },
  cohortSchool: {
    type: String,
    required: true
  },
  cohortOrg: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  adminUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Cohert = mongoose.model('Cohert', cohertSchema);

module.exports = Cohert;