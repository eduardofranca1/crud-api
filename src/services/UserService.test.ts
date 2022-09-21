import mongoose from "mongoose";
import User from "../models/UserModel";
import UserService from "./UserService";

describe("Testing user service", () => {
  const mongoUrl = "mongodb://localhost:27017/node-test";
  let name = "Eduardo";
  let email = "test@test.com";
  let password = "12345678";

  beforeAll(async () => {
    await mongoose.connect(mongoUrl);
  });

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.disconnect();
  });

  it("should create a new user", async () => {
    const response = await UserService.createUser({ name, email, password });
    expect(response).not.toBeUndefined();
  });
});
