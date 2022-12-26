import mongoose from 'mongoose';
import dbConfig from './config/db.config.js';

export default async function establishDbConnection() {
  try {
    mongoose.set('strictQuery', false);
    
    await mongoose.connect(dbConfig.url);
    
    console.log("Connected to the database!");
  } catch (error) {
    console.log("Cannot connect to the database!", err);
    process.exit();
  }
}
