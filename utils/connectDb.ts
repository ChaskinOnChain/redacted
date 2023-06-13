import mongoose, { connect } from "mongoose";

const connectDb = async () => {
  try {
    await connect(process.env.MONGO!);
  } catch (error) {
    throw new Error("Couldn't connect to DB");
  }
  console.log("Connected to DB");
};

export default connectDb;
