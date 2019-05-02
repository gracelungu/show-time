import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  static async connect() {
    // Mongoose connection
    try {
      await mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
      });
      console.log('Database connected successfully');
    } catch (e) {
      console.error(
        `Unable to connect to the database \n At ${
          process.env.DATABASE_URL
        } \n With error ${e}`,
      );
    }
  }
}

export default Database;
