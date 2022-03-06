import { Schema, model } from "mongoose";
import { compare, genSalt, hash, hashSync } from "bcryptjs";
import { IUser } from "../interfaces/types";

export interface UserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(userPassword: string): Promise<Boolean>;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await genSalt(10);
  const hash = await hashSync(user.password, salt);

  user.password = hash;

  next();
});

userSchema.pre("updateOne", async function (next) {
  let user = this;

  if (user._update.password) {
    const salt = await genSalt(10);

    const hash = await hashSync(user._update.password, salt);

    user._update.password = hash;
  }

  return next();
});

const User = model("users", userSchema);

export default User;
