import mongoose from "mongoose";
import User from "../../models/UserModel";
import UserService from "./UserService";

describe("Testing user service", () => {
  const mongoUrl = "mongodb://localhost:27017/node-test";
  let name = "Eduardo";
  let email = "test@test.com";
  let password = "12345678";

  let userToUpdate = {
    name: "Update user",
    email: "newemail@email.com",
    password: "87654321",
  };

  beforeAll(async () => {
    await mongoose.connect(mongoUrl);
  });

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.disconnect();
  });

  it("should create a new user", async () => {
    const newUser = await UserService.createUser({ name, email, password });
    expect(newUser).not.toBeUndefined();
    expect(newUser).not.toBeInstanceOf(Error);
    expect(newUser).toHaveProperty("_id");
    expect(newUser.email).toBe(email);
  });

  it("should find user by the email", async () => {
    const user = await UserService.findUserByEmail(email);
    expect(user.email).toBe(email);
  });

  it("should get a list of users", async () => {
    const users = await UserService.listAllUsers();
    expect(users.length).toBe(1);
    for (let i in users) {
      expect(users[i]).toBeInstanceOf(User);
    }
  });

  it("should update user", async () => {
    const user = await UserService.findUserByEmail(email);
    const updateUser = await UserService.updateUserById(user._id, userToUpdate);
    expect(updateUser).not.toBeInstanceOf(Error);
  });

  it("should delete user", async () => {
    const user = await UserService.findUserByEmail(userToUpdate.email);
    const deleteUser = await UserService.deleteUserById(user._id);
    expect(deleteUser).not.toBeInstanceOf(Error);
  });
});
