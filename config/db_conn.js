const mongoose = require('mongoose');
const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient();

mongoose.connect(
    `mongodb+srv://user1:User1pss@cluster0.obfkb3h.mongodb.net/ctse?retryWrites=true&w=majority&appName=Cluster0`,
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
