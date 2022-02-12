import { Request, Response } from "express";
import { UserService } from "../services";

class UserController {
  async create(request: Request, response: Response) {
    try {
      const newUser = await UserService.createUser(request.body);
      return response.status(201).json(newUser);
    } catch (error) {
      return response.status(500).json(error);
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

  async findById(request: Request, response: Response) {
    try {
      const result = await UserService.getUserById({ _id: request.query._id });
      return response.json(result);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  async updateUser(request: Request, response: Response) {
    try {
      const { _id } = request.query;
      const update = request.body;

      const result = await UserService.updateUserById({ _id }, update, {
        new: true,
      });
      return response.json(result);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  async deleteUser(request: Request, response: Response) {
    try {
      const { _id } = request.query;
      await UserService.deleteUserById({ _id });
      return response.status(204).json("Deletado");
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}

export default new UserController();
