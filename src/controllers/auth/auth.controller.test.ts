import request from "supertest";
import express from "express";
import { AuthService } from "../../services";
import AuthController from "./auth.controller";
import { Exception } from "../../exceptions";

const app = express();
app.use(express.json());

app.post("/login", AuthController.login);

jest.mock("../../services/auth/auth.service.ts");

describe("AuthControllerTest", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should gerenate jwt token and return 200 status", async () => {
    const mockLogin = {
      token: "1234",
    };

    AuthService.login = jest.fn().mockReturnValue(mockLogin);

    const response = await request(app).post("/login").send(mockLogin);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should return 401 status if the credentials is invalid", async () => {
    AuthService.login = jest
      .fn()
      .mockRejectedValue(new Exception("Email or password incorrect.", 401));

    const response = await request(app).post("/login");

    expect(response.status).toBe(401);
    expect(response.body).toEqual("Email or password incorrect.");
  });
});
