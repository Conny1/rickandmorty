import mongoose from "mongoose";

const databaseUrl = process.env.MONGO_URL as string;
// console.log(databaseUrl);

export const connectToDb = async () => {
  try {
    await mongoose.connect(databaseUrl);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("connected to mongoDb");
    });
  } catch (error) {
    // console.log(error);
    console.log("Connection to mongoDB failed");
  }
};
