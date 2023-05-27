import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MDB connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_DB!, {
      dbName: "Next",
    });
    isConnected = true;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};
