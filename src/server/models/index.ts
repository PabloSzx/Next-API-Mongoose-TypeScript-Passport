import dotenv from "dotenv";
import mongoose, { Document, model, Model } from "mongoose";

import { User } from "../../interfaces";
import { UserSchema } from "./User";

dotenv.config();

declare global {
  namespace NodeJS {
    interface Global {
      dbConnected?: true;
    }
  }
}
if (!global.dbConnected) {
  global.dbConnected = true;
  mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    bufferMaxEntries: 0,
  });
}

mongoose.models = {};

export const UserModel: Model<User & Document> = model("User", UserSchema);
