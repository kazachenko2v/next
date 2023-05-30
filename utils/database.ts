import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_DB!, {
      dbName: "Next",
    });
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
