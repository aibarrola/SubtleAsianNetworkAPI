const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

let User = require('./models/user.model');

require('dotenv').config();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  console.log("index.js", req.body)
  res.send('You made it to the api');
});

// MONGO_URI is an environment variable. Use the "dotenv" package to set this up on your local system.
// If you need help with this, contact John
const MONGOOSE_URI = `mongodb+srv://jadedbuser:${process.env.MONGO_PASS}@cluster0.3lzrw.mongodb.net/<dbname>?retryWrites=true&w=majority`
mongoose.connect(MONGOOSE_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
mongoose.connection.on('connected', () => {
  console.log("Successfully connected to MongoDB");
});
mongoose.connection.on('error', console.error.bind(console, 'Connection error: '));

// User routes
const userRouter = require('./routes/users');
app.use('/users', userRouter);

//Group routes
const groupRouter = require('./routes/groups');
app.use('/groups', groupRouter);

//Cohort routes
const cohortRouter = require('./routes/cohort');
app.use('/cohorts', cohortRouter);

//Request routes
const requestRouter = require('./routes/request');
app.use('/requests', requestRouter);

//questions routes
const questionRouter = require('./routes/questions');
app.use('/questions', questionRouter);


// Temp route to delete all users
app.delete('/getall', (req, res) => {
  User.deleteMany({})
    .then(res.json({msg: 'All users deleted'}))
    .catch(err => res.send(err));
})

// process.env.PORT is an environment variable. Needs to be setup with "dotenv"
// Contact John for help
app.listen(process.env.PORT, (req, res) => {
  console.log(`Backend server started on port: ${process.env.PORT}`);
})