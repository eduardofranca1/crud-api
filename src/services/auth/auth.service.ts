import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { tokenSecret } from "../../config";
import { Exception, HttpStatus } from "../../exceptions";
import { Auth } from "../../types";
import User from "../../models/user";

class AuthenticationService {
  login = async ({ email, password }: Auth) => {
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
        userId: user._id,
      },
      tokenSecret,
      {
        subject: user.id,
        expiresIn: "1h",
      }
    );
    return { token };
  };
}

export default new AuthenticationService();
