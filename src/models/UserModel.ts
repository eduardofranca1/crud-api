import { Schema, model } from "mongoose";
import { genSalt, hashSync } from "bcryptjs";
import { User as UserSchema } from "../types/User";

const userSchema = new Schema<UserSchema>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await genSalt(10);
  const hash = hashSync(user.password, salt);

  user.password = hash;

  next();
});

userSchema.pre("updateOne", async function (next) {
  let user = this;

  if (user._update.password) {
    const salt = await genSalt(10);

    const hash = hashSync(user._update.password, salt);

    user._update.password = hash;
  }

  return next();
});

const User = model("users", userSchema);

export default User;
