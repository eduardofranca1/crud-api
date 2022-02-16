import { Request, Response } from "express";
import { UserSchema, UserSchemaQuery } from "../schemas/UserSchema";
import UserService from "../services/UserService";

class UserController {
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
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  async findById(
    request: Request<UserSchemaQuery["query"]>,
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

      const result = await UserService.updateUserById({ _id }, update, {
        new: true,
      });
      return response.json(result);
    } catch (error: any) {
      if (error.code) return response.status(error.code).json(error.message);
      return response.status(500).json(error);
    }
  }

  async deleteUser(
    request: Request<UserSchemaQuery["query"]>,
    response: Response
  ) {
    try {
      const { _id } = request.query;
      await UserService.deleteUserById({ _id });
      return response.status(204).json("Deleted");
    } catch (error: any) {
      if (error.code) return response.status(error.code).json(error.message);
      return response.status(500).json(error);
    }
  }
}

export default new UserController();
