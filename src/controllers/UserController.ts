import { Request, Response } from "express";
import { AuthSchema, UserSchema, UserSchemaQuery } from "../schemas";
import UserService from "../services/UserService";

class UserController {
  async login(
    request: Request<{}, {}, AuthSchema["body"]>,
    response: Response
  ) {
    try {
      const { email, password } = request.body;

      const userLogin = await UserService.login({
        email: email as string,
        password: password as string,
      });

      return response.json(userLogin);
    } catch (error: any) {
      if (error.code) return response.status(error.code).json(error.message);
      else return response.status(500).json("Error");
    }
  }

  async create(
    request: Request<{}, {}, UserSchema["body"]>,
    response: Response
  ) {
    try {
      const { body } = request;
      const bodyValidator: any = body;

      const newUser = await UserService.createUser(bodyValidator);
      return response.status(201).json(newUser);
    } catch (error: any) {
      if (error.code) return response.status(error.code).json(error.message);
      return response.status(500).json("Error");
    }
  }

  async listAll(request: Request, response: Response) {
    try {
      const result = await UserService.listAllUsers();
      return response.json(result);
    } catch (error: any) {
      if (error.code) return response.status(error.code).json(error.message);
      return response.status(500).json(error);
    }
  }

  async findById(
    request: Request<{}, {}, {}, UserSchemaQuery["query"]>,
    response: Response
  ) {
    try {
      const { _id } = request.query;

      const result = await UserService.getUserById({ _id: _id });

      return response.json(result);
    } catch (error: any) {
      if (error.code) return response.status(error.code).json(error.message);
      else return response.status(500).json("Error");
    }
  }

  async updateUser(
    request: Request<{}, {}, UserSchema["body"]>,
    response: Response
  ) {
    try {
      const { _id } = request.query;
      const update = request.body;

      await UserService.updateUserById({ _id }, update);
      return response.json("Your account has been updated!");
    } catch (error: any) {
      if (error.code) return response.status(error.code).json(error.message);
      return response.status(500).json(error);
    }
  }

  async deleteUser(
    request: Request<{}, {}, {}, UserSchemaQuery["query"]>,
    response: Response
  ) {
    try {
      const { _id } = request.query;
      await UserService.deleteUserById({ _id });
      return response.sendStatus(204);
    } catch (error: any) {
      if (error.code) return response.status(error.code).json(error.message);
      return response.status(500).json(error);
    }
  }
}

export default new UserController();
