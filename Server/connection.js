const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.DATABASE;

let isConnected = false;

const connectWithRetry = () => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            isConnected = true;
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Failed to connect to MongoDB:', err);
            console.log('Retrying connection in 5 seconds...');
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();

mongoose.connection.on('error', (err) => {
    isConnected = false;
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    isConnected = false;
    console.log('MongoDB disconnected, attempting to reconnect...');
    connectWithRetry();
});

const getConnectionStatus = () => isConnected;

module.exports = {
    connection: mongoose.connection,
    isConnected: getConnectionStatus,
};
