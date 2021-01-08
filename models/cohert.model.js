const mongoose = require('mongoose');
const User = require('./user.model');

const cohertSchema = new mongoose.Schema({
    school: String,
    organization: String,
    leadID: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'}
});

const Cohert = mongoose.model('Cohert', cohertSchema);

module.exports = Cohert;