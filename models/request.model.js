const mongoose = require('mongoose');
const user = require('./user.model')

const requestSchema = mongoose.Schema({
    requesterID: {type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'},
    school: String,
    organization: String,
    status: String
});

const Request = mongoose.model('Request',requestSchema);

module.exports = Request;