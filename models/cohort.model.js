const mongoose = require('mongoose');
const User = require('./user.model');

const cohertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  org: {
    type: String,
    required: true
  }
});

const Cohert = mongoose.model('Cohert', cohertSchema);

module.exports = Cohert;