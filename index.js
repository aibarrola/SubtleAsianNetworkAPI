const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('You made it to the api');
});

// MONGO_URI is a environment variable. Use the "dotenv" package to set this up on your local system.
// If you need help with this, contact John
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => {
  console.log("Successfully connected to MongoDB");
});
mongoose.connection.on('error', console.error.bind(console, 'Connection error: '));

// process.env.PORT is a environment variable. Needs to be setup with "dotenv"
// Contact John for help
app.listen(process.env.PORT, (req, res) => {
  console.log(`Backend server started on port: ${process.env.PORT}`);
})