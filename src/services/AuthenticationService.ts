import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { tokenSecret } from "../config/Config";
import Exception from "../exceptions/Exception";
import { HttpStatus } from "../exceptions/HttpStatus";
import { Auth } from "../types/Authentication";
import User from "../models/UserModel";

class AuthenticationService {
  login = async ({ email, password }: Auth) => {
    try {
      const user = await User.findOne({ email }).select("password");

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
          idUser: user._id,
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
