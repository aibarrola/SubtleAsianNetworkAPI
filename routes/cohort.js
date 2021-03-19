const Cohort = require('../models/cohort.model');
const router = require('express').Router();

// Middle ware
const auth = require('./middleware/auth');

// @route   GET /cohorts/
// @desc    Returns all coherts
// @access  Public
router.route('/').get((req, res) => {
  Cohort.find({})
    .then(coherts => res.send(coherts));
})

router.route('/:id').get((req, res) => {
  Cohort.findById(req.params.id)
    .then(cohort => res.send(cohort))
    .catch(err => res.json({msg: 'Cohort does not exists'}));
});

// @route   GET /cohorts/
// @desc    Deletes all cohorts, TEMP
// @access  Public
router.route('/').delete((req, res) => {
  Cohort.deleteMany({})
    .then(cohorts => res.send('All cohorts deleted'));
})

// @route   POST /cohorts/
// @desc    Creates a new cohert
// @access  Public for now, going to change it to a private path
router.route('/').post(auth, (req, res) => {
  const {cohortName, cohortSchool, cohortOrg, adminUser} = req.body;
  const newCohort = new Cohort({cohortName, cohortSchool, cohortOrg, adminUser});

  const testCohort = {
    cohortName,
    cohortSchool,
    cohortOrg,
    adminUser
  }

  newCohort.save()
    .then(newRegCohort => {
      res.send('Success');
    })
    .catch (err => res.status(400).json('Error: ' + err));

})

module.exports = router;