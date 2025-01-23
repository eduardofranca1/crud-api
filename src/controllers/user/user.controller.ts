import { Request, Response } from "express";
import { UserService } from "../../services";
import {
  CreateUserSchema,
  UpdateUserSchema,
  RequestIdSchema,
} from "../../schemas";

class UserController {
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

  async findAll(_request: Request, response: Response) {
    try {
      const result = await UserService.findAll();
      response.status(200).json(result);
    } catch (error: any) {
      response.status(error.code).json(error.message);
    }
  }

  async findById(request: Request<RequestIdSchema>, response: Response) {
    try {
      const { _id } = request.params;
      const result = await UserService.findById(_id);
      response.status(200).json(result);
    } catch (error: any) {
      response.status(error.code).json(error.message);
    }
  }

  async update(
    request: Request<RequestIdSchema, {}, UpdateUserSchema>,
    response: Response
  ) {
    try {
      const { _id } = request.params;
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

  async disabled(request: Request<RequestIdSchema>, response: Response) {
    try {
      const { _id } = request.params;
      await UserService.disabled(_id);
      response.status(200).json("User updated");
    } catch (error: any) {
      response.status(error.code).json(error.message);
    }
  }

  async delete(request: Request<RequestIdSchema>, response: Response) {
    try {
      const { _id } = request.params;
      await UserService.deleteById(_id);
      response.sendStatus(204);
    } catch (error: any) {
      response.status(error.code).json(error.message);
    }
  }
}

export default new UserController();
