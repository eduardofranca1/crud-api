import mongoose from "mongoose";
import User from "../../models/user";
import { AuthService, UserService } from "..";
import { mongodbTest } from "../../config";

describe("AuthServiceTest", () => {
  beforeAll(async () => {
    await mongoose.connect(mongodbTest);
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should authenticate the user and return the token.", async () => {
    const user = await UserService.create({
      name: "Dudu",
      email: "dudu@email",
      password: "123456",
    });

    const result = await AuthService.login({
      email: user.email,
      password: "123456",
    });

    expect(result).not.toBeUndefined();
    expect(result).toHaveProperty("token");
  });

  it("should throw an exception if attempting to sign in with invalid credentials.", async () => {
    await expect(
      AuthService.login({
        email: "email@test.com",
        password: "123456",
      })
    ).rejects.toThrow("Email or password incorrect.");
  });
});
