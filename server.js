const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

// middle ware for express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// set up to connect server to mongoose database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pizza-hunt', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// this will log mongo queries that are being excuted in command line
// Use this to log mongo queries being executed!
mongoose.set('debug', true);

// starts application for this challenge will just be using insomnia to test routes
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));