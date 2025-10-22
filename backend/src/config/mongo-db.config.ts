import mongoose from "mongoose";
import type { IDatabase } from "../database/interfaces/database.interface.js";
import envs from "./envs.config.js";

export class MongoConfig implements IDatabase {

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(envs.MONGO_URI!!);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log("MongoDB disconnected");
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error);
    }
  }
}