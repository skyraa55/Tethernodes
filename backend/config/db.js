// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.error(`MongoDB connection error: ${err.message}`);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;





const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection failed:");
    console.error(err);   // Print the complete error

    throw err;            // Don't call process.exit(1) for now
  }
};

module.exports = connectDB;
