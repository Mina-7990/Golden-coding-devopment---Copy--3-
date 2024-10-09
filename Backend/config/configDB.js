const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

console.log('Mongo URI:', process.env.MONGO_URI); // Debugging line to check the value

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;