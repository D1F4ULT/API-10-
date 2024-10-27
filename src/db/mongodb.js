const mongoose = require('mongoose');
const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/verificador',);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};
module.exports = connectMongoDB;