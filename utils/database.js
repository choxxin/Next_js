import mongoose from "mongoose";

let isconnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true); //Stop giving error in the console

  if (isconnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbname: "share_prompt",
      usenewUrlParser: true,
      useunifiedTopology: true,
    });
    isconnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error.message);
  }
};

// useNewUrlParser: This option tells the MongoDB driver to use the new URL parser instead of the deprecated one. The new URL parser is more compliant with the connection string specification and handles certain edge cases better.

//useUnifiedTopology: This option enables the new unified topology layer in the MongoDB driver. The unified topology layer provides a more robust and flexible API for monitoring server states, handling connection pooling, and providing more reliable behavior across different MongoDB versions and deployment topologies.
