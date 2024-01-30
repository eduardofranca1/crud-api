import { Request, Response } from "express";
import { LoginSchema, UserSchema, UserSchemaQuery } from "../schemas";
import { AuthenticationService, UserService } from "../services";

class UserController {
  async login(
    request: Request<{}, {}, LoginSchema["body"]>,
    response: Response
  ) {
    try {
      const { email, password } = request.body;
      const userLogin = await AuthenticationService.login({
        email: email,
        password: password,
      });
      response.status(200).json(userLogin);
    } catch (error: any) {
      response.status(error.code).json(error.message);
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
      response.status(201).json(newUser._id);
    } catch (error: any) {
      response.status(error.code).json(error.message);
    }
  }

  async listAll(_request: Request, response: Response) {
    try {
      const result = await UserService.listAllUsers();
      response.status(200).json(result);
    } catch (error: any) {
      response.status(error.code).json(error.message);
    }
  }

  async findById(
    request: Request<{}, {}, {}, UserSchemaQuery["query"]>,
    response: Response
  ) {
    try {
      const { _id } = request.query;
      const result = await UserService.findUserById(_id);
      response.status(200).json(result);
    } catch (error: any) {
      response.status(error.code).json(error.message);
    }
  }

  async updateUser(
    request: Request<{}, {}, UserSchema["body"]>,
    response: Response
  ) {
    try {
      const { _id, name, email, password } = request.body;
      const objectFromBody = {
        name: name,
        email: email,
        password: password,
      };
      await UserService.updateUserById(_id, objectFromBody);
      response.status(200).json("Your account has been updated!");
    } catch (error: any) {
      response.status(error.code).json(error.message);
    }
  }

  async softDelete(
    request: Request<{}, {}, {}, UserSchemaQuery["query"]>,
    response: Response
  ) {
    try {
      const { _id } = request.query;
      await UserService.softDelete(_id);
      response.sendStatus(204);
    } catch (error: any) {
      response.status(error.code).json(error.message);
    }
  }

  async deleteUser(
    request: Request<{}, {}, {}, UserSchemaQuery["query"]>,
    response: Response
  ) {
    try {
      const { _id } = request.query;
      await UserService.deleteUserById(_id);
      response.sendStatus(204);
    } catch (error: any) {
      response.status(error.code).json(error.message);
    }
  }
}

export default new UserController();
