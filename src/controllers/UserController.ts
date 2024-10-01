import { Request, Response } from "express";
import { AuthenticationService, UserService } from "../services";
import {
  AuthSchema,
  CreateUserSchema,
  UpdateUserSchema,
  QueryIdSchema,
  DisabledUserSchema,
} from "../schemas";

class UserController {
  async login(request: Request<{}, {}, AuthSchema>, response: Response) {
    try {
      const { email, password } = request.body;
      const result = await AuthenticationService.login({
        email: email,
        password: password,
      });
      response.status(200).json(result);
    } catch (error: any) {
      response.status(error.code).json(error.message);
    }
  }

  async create(request: Request<{}, {}, CreateUserSchema>, response: Response) {
    try {
      const { name, email, password } = request.body;
      const result = await UserService.create({
        name,
        email,
        password,
      });
      response.status(201).json(result);
    } catch (error: any) {
      response.status(error.code).json(error.message);
    }
  }

  async listAll(_request: Request, response: Response) {
    try {
      const result = await UserService.findAll();
      response.status(200).json(result);
    } catch (error: any) {
      response.status(error.code).json(error.message);
    }
  }

  async findById(
    request: Request<{}, {}, {}, QueryIdSchema>,
    response: Response
  ) {
    try {
      const { _id } = request.query;
      const result = await UserService.findById(_id);
      response.status(200).json(result);
    } catch (error: any) {
      response.status(error.code).json(error.message);
    }
  }

  async updateUser(
    request: Request<{}, {}, UpdateUserSchema, QueryIdSchema>,
    response: Response
  ) {
    try {
      const { _id } = request.query;
      const { name, email } = request.body;
      await UserService.updateById(_id, {
        name,
        email,
      });
      response.status(200).json("Your account has been updated!");
    } catch (error: any) {
      response.status(error.code).json(error.message);
    }
  }

  async softDelete(
    request: Request<{}, {}, DisabledUserSchema, QueryIdSchema>,
    response: Response
  ) {
    try {
      const { _id } = request.query;
      const { disabled } = request.body;
      await UserService.softDelete(_id, disabled);
      response.sendStatus(204);
    } catch (error: any) {
      response.status(error.code).json(error.message);
    }
  }

  async deleteUser(
    request: Request<{}, {}, {}, QueryIdSchema>,
    response: Response
  ) {
    try {
      const { _id } = request.query;
      await UserService.deleteById(_id);
      response.sendStatus(204);
    } catch (error: any) {
      response.status(error.code).json(error.message);
    }
  }
}

export default new UserController();
