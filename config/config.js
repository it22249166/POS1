const mongoose = require('mongoose');
require('colors');
const dbState = require('./dbState');

const connectdb = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('❌ Database connection skipped: MONGODB_URI is undefined'.bgYellow.black);
      return;
    }

    const conn = await mongoose.connect(uri);
    dbState.connected = true;
    console.log(`✅ MongoDB connected: ${conn.connection.host}`.bgGreen.white);
  } catch (err) {
    dbState.connected = false;
    console.error(`⚠️ Database unavailable, using fallback data: ${err.message}`.bgYellow.black);
  }
};

module.exports = connectdb;
