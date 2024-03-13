import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import config from "../src/config/config";

const MONGODB_URI = config.MONGODB_URI_CONVERT;


export const runMongo = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.log(error);
  }
}
