import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Connected to database , Host : ${conn.connection.host}`.blue.bold
    );
  } catch (error) {
    console.log(`Error : ${error.message}`.red.bold.underline);
    process.exit(1);
  }
};

export default connectDB;
