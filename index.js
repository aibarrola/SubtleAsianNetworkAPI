const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

let User = require('./models/user.model');

require('dotenv').config();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('You made it to the api');
});


// MONGO_URI is an environment variable. Use the "dotenv" package to set this up on your local system.
// If you need help with this, contact John
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.connection.on('connected', () => {
  console.log("Successfully connected to MongoDB");
});
mongoose.connection.on('error', console.error.bind(console, 'Connection error: '));

// User routes
const userRouter = require('./routes/users');
app.use('/users', userRouter);

// Create profile routes
const profileRouter = require('./routes/updateUser');
app.use('/updateProfile', profileRouter);

// Temp route to check current users
app.get('/getall', (req, res) => {
  User.find({}, (err, result) => {
    if(err) {
      result.send(err);
    } else {
      res.json(result);
    }
  });
});

// process.env.PORT is an environment variable. Needs to be setup with "dotenv"
// Contact John for help
app.listen(process.env.PORT, (req, res) => {
  console.log(`Backend server started on port: ${process.env.PORT}`);
})