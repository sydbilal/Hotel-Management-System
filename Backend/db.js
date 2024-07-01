require('dotenv').config();
const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

connection.on('connected', () => {
    console.log('MongoDB connection successful');
});

module.exports = mongoose;
