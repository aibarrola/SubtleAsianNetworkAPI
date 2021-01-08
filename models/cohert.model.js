const mongoose = require('mongoose');

const cohertSchema = new mongoose.Schema({
    school: String,
    organization: String
});

const Cohert = mongoose.model('Cohert', cohertSchema);

module.exports = Cohert;