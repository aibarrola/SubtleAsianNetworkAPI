const Cohert = require('../models/cohert.model');
const router = require('Express').Router();

router.route('/').post((req, res) =>{
    // const {school, organization, leadID} = req.body;
    // const newCohert = new Cohert({school, organization, leadID});
    // newCohert.save()
    // .then(res.json("Successfully Created"))
    // .catch(err=> res.status(400).json("Error: "+ err))

    res.send('Cohert route');

});

router.route('/').get((req,res)=>{
Cohert.find({})
.then(coherts => res.send(coherts));
})

module.exports = router;