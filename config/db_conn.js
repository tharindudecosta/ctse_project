const mongoose = require('mongoose');
const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient();

mongoose.connect(
    process.env.MONGO_DB_URI,
    {
       
        socketTimeoutMS: 30000,
        connectTimeoutMS: 30000
    }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('MongoDB connected successfully');
});

module.exports = { mongoose, redisClient };
