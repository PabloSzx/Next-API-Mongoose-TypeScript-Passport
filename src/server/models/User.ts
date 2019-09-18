import { Document, Schema } from "mongoose";

import { User } from "../../interfaces";

export const UserSchema = new Schema<User & Document>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
