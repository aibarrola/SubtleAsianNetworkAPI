const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema ({
    type: {
        type:String,
        required: true
    },
    question: {
        type:String,
        required: true
    },
    answers: {
        type:[String]
    }
})

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;