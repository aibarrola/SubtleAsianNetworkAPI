const router = require('express').Router();
let User = require('../models/user.model');
var bcrypt = require('bcrypt');


router.route('/register').post((req,res)=>{
    const BCRYPT_SALT_ROUNDS =12;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const birthDate = req.body.birthDate;
    const admin = false;
    let hashedPassword = bcrypt.hashSync(req.body.password,BCRYPT_SALT_ROUNDS);
    const newUser = new User({firstName, lastName,hashedPassword, birthDate, email,admin});

    newUser.save()
    .then(() => res.json({userID: newUser._id}))
    .catch(err=>res.status(400).json('Error: ' +err));
});


module.exports = router;