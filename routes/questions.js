const router = require('express').Router();
const Question = require('../models/question.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const nodemailer = require('nodemailer');

// Middle ware
//const auth = require('./middleware/auth')

// @Route GET /questions
// @desc Returns all questions
// @access Public
router.route('/').get((req,res) => {
    Question.find({})
    .then(questions => res.send(questions))
    .catch(err => res.status(404).send(err))
})

// @Route   POST /questions
// @desc    Upload a question
// @access  Public
.post((req,res) => {
    const {type, question, answers} = req.body
    console.log("quesitons.js ", req.body.type, question, answers)
    let newQuestion = new Question({
        type:type,
        question: question,
        answers:answers
    })
    newQuestion.save()
    .then(question => res.send(question))
    .catch(err => res.status(404).send(err))
})

module.exports = router