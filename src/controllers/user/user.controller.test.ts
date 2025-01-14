import request from "supertest";
import express from "express";
import { UserService } from "../../services";
import UserController from "./user.controller";
import { Exception } from "../../exceptions";

const app = express();
app.use(express.json());

app.post("/user", UserController.create);
app.get("/user", UserController.findAll);
app.get("/user/findById", UserController.findById);
app.put("/user", UserController.update);
app.put("/user/disabled", UserController.disabled);
app.delete("/user", UserController.delete);

jest.mock("../../services/user/user.service.ts");

describe("UserControllerTest", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user and return 201 status.", async () => {
    const mockUser = {
      _id: "66e03041e8902e1fc4c558cc",
      name: "Dudu",
      email: "dudu@email.com",
    };

    UserService.create = jest.fn().mockResolvedValue(mockUser);

    const response = await request(app).post("/user").send(mockUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
  });

  it("should get a user by id and return 200 status.", async () => {
    const mockUser = {
      _id: "66e03041e8902e1fc4c558cc",
      name: "Dudu",
      email: "dudu@email.com",
    };

    UserService.findById = jest.fn().mockResolvedValue(mockUser);

    const response = await request(app).get(
      "/user/findById?_id=66e03041e8902e1fc4c558cc"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it("should return 404 status if the user is not found.", async () => {
    UserService.findById = jest
      .fn()
      .mockRejectedValue(new Exception("User not found", 404));

    const response = await request(app).get(
      "/user/findById?_id=66e03041e8902e1fc4c558cc"
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual("User not found");
  });

  it("should get a user list and return 200 status.", async () => {
    const mockUser = [
      {
        _id: "66e03041e8902e1fc4c558cc",
        name: "Dudu",
        email: "dudu@email.com",
      },
    ];

    UserService.findAll = jest.fn().mockResolvedValue(mockUser);

    const response = await request(app).get("/user");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
    expect(response.body.length).toBe(1);
  });

  it("should update a user and return 200 status.", async () => {
    const mockUser = {
      name: "Dudu",
      email: "dudu@email.com",
    };

    UserService.updateById = jest.fn().mockResolvedValue(mockUser);

    const response = await request(app).put(
      "/user?_id=66e03041e8902e1fc4c558cc"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual("Your account has been updated!");
  });

  it("should return a 404 status if the user to update is not found.", async () => {
    UserService.updateById = jest
      .fn()
      .mockRejectedValue(new Exception("User not found", 404));

    const response = await request(app).put(
      "/user?_id=66e03041e8902e1fc4c558cc"
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual("User not found");
  });

  it("should return a 400 status if updating a user with an existing email.", async () => {
    UserService.updateById = jest
      .fn()
      .mockRejectedValue(new Exception("Email already exists", 400));

    const response = await request(app).put(
      "/user?_id=66e03041e8902e1fc4c558cc"
    );

    expect(response.status).toBe(400);
    expect(response.body).toEqual("Email already exists");
  });

  it("should disabled a user and return 200 status.", async () => {
    const response = await request(app).put(
      "/user/disabled?_id=66e03041e8902e1fc4c558cc"
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual("User updated");
  });

  it("should return a 404 status if the user to disabled is not found.", async () => {
    UserService.disabled = jest
      .fn()
      .mockRejectedValue(new Exception("User not found", 404));
    const response = await request(app).put(
      "/user/disabled?_id=66e03041e8902e1fc4c558cc"
    );
    expect(response.status).toBe(404);
    expect(response.body).toEqual("User not found");
  });

  it("should delete a user by id and return 204 status.", async () => {
    const response = await request(app).delete(
      "/user?_id=66e03041e8902e1fc4c558cc"
    );
    expect(response.status).toBe(204);
  });

  it("should return a 404 status if the user to delete is not found.", async () => {
    UserService.deleteById = jest
      .fn()
      .mockRejectedValue(new Exception("User not found", 404));
    const response = await request(app).delete(
      "/user?_id=66e03041e8902e1fc4c558cc"
    );
    expect(response.status).toBe(404);
    expect(response.body).toEqual("User not found");
  });
});
