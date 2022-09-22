import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { tokenSecret } from "../config";
import Exception from "../exceptions/Exception";
import { HttpStatus } from "../exceptions/HttpStatus";
import { IAuthenticationRequest } from "../interfaces/types";
import User from "../models/UserModel";

class AuthenticationService {
  login = async ({ email, password }: IAuthenticationRequest) => {
    try {
      const user = await User.findOne({ email: email }).select("password");

      if (!user)
        throw new Exception(
          "Email or password incorrect.",
          HttpStatus.UNAUTHORIZED
        );

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch)
        throw new Exception(
          "Email or password incorrect.",
          HttpStatus.UNAUTHORIZED
        );

      const token = sign(
        {
          email: user.email,
        },
        tokenSecret,
        {
          subject: user.id,
          expiresIn: "1d",
        }
      );
      return token;
    } catch (error: any) {
      throw new Exception(error.message, error.code);
    }
  };
}

export default new AuthenticationService();
