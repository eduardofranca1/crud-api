import mongoose from "mongoose";
import User from "../../models/user";
import UserService from "./user.service";
import { mongodbTest } from "../../config";

describe("UserServiceTest", () => {
  beforeAll(async () => {
    await mongoose.connect(mongodbTest);
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should create a new user", async () => {
    const result = await UserService.create({
      name: "Dudu",
      email: "dudu@email",
      password: "123456",
    });
    expect(result).not.toBeUndefined();
    expect(result).not.toBeInstanceOf(Error);
    expect(result).toHaveProperty("_id");
    expect(result.name).toBe("Dudu");
    expect(result.email).toBe("dudu@email");
  });

  it("should get user by id", async () => {
    const result = await UserService.create({
      name: "Dudu",
      email: "dudu@email.com",
      password: "123456",
    });
    const user = await UserService.findById(result._id.toString());
    expect(user.name).toBe("Dudu");
    expect(user.email).toBe("dudu@email.com");
  });

  it("should throw an exception when trying to find a non-existing user by id", async () => {
    await expect(
      UserService.findById("66e03041e8902e1fc4c558ca")
    ).rejects.toThrow("User not found");
  });

  it("should get user by the email", async () => {
    const result = await UserService.create({
      name: "Dudu",
      email: "dudu@email.com",
      password: "123456",
    });
    const user = await UserService.findByEmail(result.email);
    expect(user.name).toBe("Dudu");
    expect(user.email).toBe("dudu@email.com");
  });

  it("should throw an exception when trying to find a non-existing user by email", async () => {
    await expect(UserService.findByEmail("email@test.com")).rejects.toThrow(
      "User not found"
    );
  });

  it("should get a user list", async () => {
    await UserService.create({
      name: "Dudu",
      email: "dudu@email",
      password: "123456",
    });
    const users = await UserService.findAll();
    expect(users.length).toBe(1);
    for (const i in users) {
      expect(users[i]).toBeInstanceOf(User);
    }
  });

  it("should update a user", async () => {
    const user = await UserService.create({
      name: "Dudu",
      email: "dudu@email",
      password: "123456",
    });
    const updatedUser = await UserService.updateById(user._id.toString(), {
      name: "Dudu Updated",
      email: "dudu.updated@email.com",
    });
    expect(updatedUser).not.toBeInstanceOf(Error);
  });

  it("should throw an exception when trying to update a non-existing user by id", async () => {
    await expect(
      UserService.updateById("66e03041e8902e1fc4c558ca", {
        name: "Dudu Updated",
        email: "dudu.updated@email.com",
      })
    ).rejects.toThrow("User not found");
  });

  it("should throw an exception when trying to update a user with an existing email", async () => {
    const userNumberOne = await UserService.create({
      name: "Dudu",
      email: "duduone@email",
      password: "123456",
    });
    const userNumberTwo = await UserService.create({
      name: "Dudu",
      email: "dudutwo@email",
      password: "123456",
    });
    await expect(
      UserService.updateById(userNumberOne._id.toString(), {
        name: "Dudu Updated",
        email: userNumberTwo.email,
      })
    ).rejects.toThrow("Email already exists");
  });

  it("should disabled a user", async () => {
    const user = await UserService.create({
      name: "Dudu",
      email: "dudu@email",
      password: "123456",
    });

    const disabledUser = await UserService.disabled(user._id.toString());
    expect(disabledUser).not.toBeInstanceOf(Error);
  });

  it("should throw an exception when trying to disabled a non-existing user", async () => {
    await expect(
      UserService.disabled("66e03041e8902e1fc4c558ca")
    ).rejects.toThrow("User not found");
  });

  it("should delete a user", async () => {
    const user = await UserService.create({
      name: "Dudu",
      email: "dudu@email",
      password: "123456",
    });
    const deletedUser = await UserService.deleteById(user._id.toString());
    expect(deletedUser).not.toBeInstanceOf(Error);
  });

  it("should throw an exception when trying to delete a non-existing user", async () => {
    await expect(
      UserService.deleteById("66e03041e8902e1fc4c558ca")
    ).rejects.toThrow("User not found");
  });
});
