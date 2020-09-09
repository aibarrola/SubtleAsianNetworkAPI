const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('You made it to the api');
});

const PORT = 5000 | process.env.PORT;

app.listen(PORT, (req, res) => {
  console.log(`Backend server started on port: ${PORT}`);
})