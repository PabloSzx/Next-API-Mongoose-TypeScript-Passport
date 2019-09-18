import dotenv from "dotenv";
import mongoose, { model, Model } from "mongoose";

import { User } from "../../interfaces";
import { UserSchema } from "./User";

dotenv.config();
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.models = {};

export const UserModel: Model<User> = model("User", UserSchema);
