import request from "supertest";
import express from "express";
import { UserService } from "../services";
import UserController from "./user.controller";

const app = express();
app.use(express.json());

app.post("/user", UserController.create);
app.get("/user", UserController.findAll);
app.get("/user/findById", UserController.findById);
app.put("/user", UserController.update);
app.delete("/user", UserController.delete);

jest.mock("../services/user/user.service.ts");

describe("UserControllerTest", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user and return 201", async () => {
    const mockUser = {
      _id: "66e03041e8902e1fc4c558cc",
      name: "Dudu",
      email: "dudu@email.com",
    };

    (UserService.create as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).post("/user").send(mockUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
  });

  it("should get a user by id and return 200", async () => {
    const mockUser = {
      _id: "66e03041e8902e1fc4c558cc",
      name: "Dudu",
      email: "dudu@email.com",
    };

    (UserService.findById as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).get(
      "/user/findById?_id=66e03041e8902e1fc4c558cc"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it("should throw an exception and return 404", async () => {
    (UserService.findById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get(
      "/user/findById?_id=66e03041e8902e1fc4c558cc"
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual("User not found");
  });

  it("should get a user list and return 200", async () => {
    const mockUser = [
      {
        _id: "66e03041e8902e1fc4c558cc",
        name: "Dudu",
        email: "dudu@email.com",
      },
    ];

    (UserService.findAll as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).get("/user");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
    expect(response.body.length).toBe(1);
  });
});
