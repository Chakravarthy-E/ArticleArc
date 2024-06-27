import mongoose from "mongoose";
require("dotenv").config();

const dbUrl: string = process.env.DB_URI || "";

const connectToDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data: any) => {
      console.log("database connected successfully", data.connection.host);
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectToDB, 5000);
  }
};

export default connectToDB;
