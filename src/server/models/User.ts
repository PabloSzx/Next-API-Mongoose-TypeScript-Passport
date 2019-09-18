import { Schema } from "mongoose";

import { User } from "../../interfaces";

export const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
});
