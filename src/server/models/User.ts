import { Document, Schema } from "mongoose";

import { User } from "../../interfaces";

export const UserSchema = new Schema<User & Document>({
  name: {
    type: String,
    required: true,
  },
});
