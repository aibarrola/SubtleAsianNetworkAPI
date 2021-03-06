const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const nodemailer = require('nodemailer');

// Middle ware
const auth = require('./middleware/auth');

// @Route   GET /users/
// @desc    Returns all users
// @access  Public
router.route('/').get((req, res) => {
    User.find({})
        .select('-hashedPassword')
        .then( users => res.send(users));
})

// @Route   GET /users/:id
// @desc    Return a specific user
// @access  Public
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .select('-hashedPassword')
        .then( user => res.json(user));
})

// @Route   DELETE /users/:id
// @desc    Delete a specific user
// @access  TEMP
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      res.json(`User: ${user.firstName} ${user.lastName} ${user._id} has been deleted.`)
    })
    .catch(err => {
      res.json(err);
    });
})


// @Route   POST /users/register
// @desc    Register a new user
// @access  Public
router.route('/register').post((req,res)=>{
    const BCRYPT_SALT_ROUNDS =12;
    const { firstName, lastName, email, password} = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {

            // If user is found return 400 status
            // 400 = Bad request
            if(user) return res.status(400).json({msg: 'User already exist'});

            // Generate salt and hash for password
            let hashedPassword = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);

            // Create newUser
            const newUser = new User({firstName, lastName, hashedPassword, email});
            
            // Save the newUser
            newUser.save()
                .then(newRegUser => {
                    // JSON Web Token Payload
                    // Message John for the JWT_SECRET
                    jwt.sign(
                        // Send back the USER ID
                        {
                            user_id: newRegUser.id,
                            admin: newRegUser.admin
                        },
                        // Pass on JWT_SECRET
                        process.env.JWT_SECRET,
                        // Call back function
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                // Send back token
                                token,
                                // Send back user
                                newRegUser: {
                                    user_id: newRegUser.id,
                                    firstName: newRegUser.firstName,
                                    lastName: newRegUser.lastName,
                                    email: newRegUser.email
                            }})
                        }
                    )
                })
                .catch(err => res.status(400).json('Error: ' + err));
        })
});

// @Route   POST /users/auth
// @desc    Authenticate User for login
// @access  Public
router.route('/auth').post((req,res)=>{
    const { email, password} = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            // If user is NOT found return 400 status
            // 400 = Bad request
            if(!user) return res.status(400).json({msg: 'User does not exist'});
            // Validate password
            bcrypt.compare(password, user.hashedPassword)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });
                    jwt.sign(
                        // Send back the USER ID
                        {
                            user_id: user.id,
                            admin: user.admin
                        },
                        // Pass on JWT_SECRET
                        process.env.JWT_SECRET,
                        // Call back function
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                // Send back token
                                token,
                                // Send back user
                                user: {
                                    user_id: user.id,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    hashedPassword: user.hashedPassword,
                                    email: user.email
                            }})
                        }
                    )
                })
        })
});

// @Route   GET /users/auth/:id
// @desc    Get user data
// @access  Private
router.route('/auth/:id').get(auth, (req, res) => {
    User.findById(req.user.user_id)
        .select('-password')
        .then( user => res.json(user));
})

// @route   POST /users/:id/createprofile/1
// @desc    Send form from createprofile1 and update user
// @access  PRIVATE
router.route('/:id/createprofile/1').post(auth, (req, res) => {
    const { school, profession, ethnicity } = req.body;
    const id = req.params.id;

    User.findOneAndUpdate({"_id": id}, {
        $set: {
            school, profession, ethnicity
        }
    }, {new: true}, (err, updated) => {
        if (err) throw err;
        res.send(updated);
    })
});

// @route   POST /users/:id/createprofile/2
// @desc    Send form from createprofile2 and update user
// @access  PRIVATE
router.route('/:id/createprofile/2').post(auth, (req, res) => {
    const { location, interests, bio, group } = req.body;
    const id = req.params.id;

    User.findOneAndUpdate({"_id": id}, {
        $set: {
            location, interests, bio, group
        },
    }, {new: true}, (err, updated) => {
        if (err) throw err;
        res.send(updated);
    })
});

// @route   PUT /users/forgotpassword
// @desc    Generate password token and send email
// @access  PUBLIC
router.route('/forgotpassword').post((req, res) => {
  if (req.body.email === '') {
    res.status(400).send('email required');
  }

  User.findOne({email: req.body.email})
    .then( user => {
      if (user === null) {
        console.error('email is not in the database');
        console.log(req.body.email);
        res.status(403).json({status: 'fail'});
      } else {
        const token = crypto.randomBytes(20).toString('hex');
        
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 1800000; // Create 30 minute expiration
        user.save();

        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`
          }
        });

        const mailOptions = {
          from: '"Jade Support Team" <jadeSupportTeam@gmail.com>',
          to: `${user.email}`,
          subject: 'Reset Password',
          text: `Forgot your password? It happens to everyone, we'll get you back into your account with a brand new password! \n\n` +
                `Please click on the link below to reset your password. This link is valid for the next 30 minutes. \n\n` +
                `http://localhost:3000/resetpassword/${token} \n\n` +
                `If you didn't request this email, please ignore this email. To be extra safe, we suggest that you change your password.\n`
        };

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('There was an error: ' + err);
            res.json({status: 'error'});
          } else {
            console.log('here is the res: ' + response);
            res.status(200).json({status: 'ok'});
          }
        });

      }
    })
    .catch(err => {
      res.send(err);
    })
})

// @route   GET /users/reset/:token
// @desc    Checks if there is a valid reset token
// @access  PUBLIC
router.route('/reset/:token').get((req, res) => {
  User.findOne({resetPasswordToken: req.params.token})
    .then(user => {
      if (user.resetPasswordExpires > Date.now()) {
        res.json({message: 'valid token', firstName: user.firstName, lastName: user.lastName, userID: user._id});
      } else {
        res.status(403).json({message: 'invalid token'});
      }
    })
    .catch(err => {
      console.log(err);
    })
});

// @route   POST /users/reset/:id
// @desc    Resets users password
// @access  PUBLIC
router.route('/reset/:id').post((req, res) => {
  const BCRYPT_SALT_ROUNDS = 12;
  const { password } = req.body;
  const { id } = req.params;

  let hashedPassword = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);

  const update = {
    hashedPassword
  }

  User.findByIdAndUpdate(id, update, (err, result) => {
    if(err) {
      console.log(err);
      res.json({status: 'error'});
    } else {
      res.json({status: 'ok'});
    }
  })

});

module.exports = router;