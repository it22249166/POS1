const mongoose = require('mongoose');
require('colors');

const connectdb = async () => {
    try {
        const uri = process.env.MONGODB_URI; // Corrected variable name
        if (!uri) {
            console.error("❌ Database connection failed: MONGODB_URI is undefined".bgRed.white);
            process.exit(1);
        }

        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`✅ MongoDB connected: ${conn.connection.host}`.bgGreen.white);
    } catch (err) {
        console.error(`❌ Database connection failed: ${err.message}`.bgRed.white);
        process.exit(1);
    }
};

module.exports = connectdb;