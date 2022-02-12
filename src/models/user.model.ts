import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/types";

export interface UserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

export default model("users", userSchema);
