import { Request, Response } from "express";
import { AuthService } from "../../services";
import { AuthSchema } from "../../schemas";

class AuthController {
  async login(request: Request<{}, {}, AuthSchema>, response: Response) {
    try {
      const { email, password } = request.body;
      const result = await AuthService.login({ email, password });
      response.status(200).json(result);
    } catch (error: any) {
      response.status(error.code).json(error.message);
    }
  }
}

export default new AuthController();
