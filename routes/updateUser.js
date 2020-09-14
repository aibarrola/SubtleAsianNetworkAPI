const router = require('express').Router();
const mongoose = require('mongoose');
let User = require('../models/user.model');

router.route('/updateInfo1/:userID').post((req,res) => {
  const userID = req.params.userID;
  const school = req.body.school;
  const profession = req.body.profession;
  const ethnicity = req.body.ethnicity;

  User.findOneAndUpdate({"_id": userID}, {
    "school": school,
    "profession": profession,
    "ethnicity": ethnicity
  });
});

router.route('/updateInfo2/:userID').post((req, res) => {
  const userID = req.params.userID;
  const location = req.body.location;
  const interests = req.body.interests;
  const bio = req.body.bio;

  User.findOneAndUpdate({"_id": userID}, {
    "location": location,
    "interests": interests,
    "bio": bio
  }) 
})

module.exports = router;