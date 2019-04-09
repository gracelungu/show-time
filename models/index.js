import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Mongoose connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});

const database = mongoose.connection;

// Detect connection failures
database.on("error", e => {
  console.error(
    `Unable to connect to the database \n At ${
      process.env.DATABASE_URL
    } \n With error ${e}`
  );
});

// The database is connected successfully
database.once("open", () => {
  console.log("Database connected successfully");
});
