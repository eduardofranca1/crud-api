import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { omit } from "lodash";

import { tokenSecret } from "../config";
import CustomException from "../exceptions/CustomException";
import { HttpStatus } from "../exceptions/HttpStatus";
import { IUser, IAuthenticationRequest } from "../interfaces/types";
import User, { UserDocument } from "../models/UserModel";

class UserService {
  login = async ({ email, password }: IAuthenticationRequest) => {
    try {
      const user = await User.findOne({ email: email }).select("password");

      if (!user)
        throw new CustomException(
          "Email or password incorrect.",
          HttpStatus.BAD_REQUEST
        );

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch)
        throw new CustomException(
          "Email or password incorrect.",
          HttpStatus.BAD_REQUEST
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
      if (error.code) throw new CustomException(error.message, error.code);
      else throw new CustomException("Error", 500);
    }
  };

  createUser = async (input: IUser) => {
    try {
      const email = await User.findOne({ email: input.email });

      if (email)
        throw new CustomException(
          "Email already exists",
          HttpStatus.BAD_REQUEST
        );

      const user = await User.create(input);

      return omit(user.toJSON(), "password");
    } catch (error: any) {
      if (error.code) throw new CustomException(error.message, error.code);
      else throw new CustomException("Error", 500);
    }
  };

  listAllUsers = async () => {
    try {
      const users = await User.find();
      if (!users)
        throw new CustomException("There are no users", HttpStatus.NOT_FOUND);
      return users;
    } catch (error: any) {
      if (error.code) throw new CustomException(error.message, error.code);
      else throw new CustomException("Error", 500);
    }
  };

  getUserByFilter = async (query: FilterQuery<UserDocument>) => {
    try {
      const user = await User.findOne(query);
      if (!user) throw new CustomException("Not found", HttpStatus.NOT_FOUND);
      return user;
    } catch (error: any) {
      if (error.code) throw new CustomException(error.message, error.code);
      else throw new CustomException("Error", 500);
    }
  };

  updateUserById = async (
    idUser: string,
    update: UpdateQuery<UserDocument>
  ) => {
    try {
      const user = await this.getUserByFilter({ _id: idUser, disabled: false });

      if (user.email !== update.email) {
        const emailExists = await User.findOne({ email: update.email });
        if (emailExists) {
          throw new CustomException(
            "Email already exists",
            HttpStatus.BAD_REQUEST
          );
        }
      }

      await User.updateOne({ _id: user._id }, update);
    } catch (error: any) {
      if (error.code) throw new CustomException(error.message, error.code);
      else throw new CustomException("Error", 500);
    }
  };

  softDeleteUser = async (idUser: string) => {
    try {
      const user = await this.getUserByFilter({ _id: idUser, disabled: false });
      const { _doc } = user;
      const update = {
        ..._doc,
        disabled: true,
      };
      await User.updateOne({ _id: user._id }, update);
    } catch (error: any) {
      if (error.code) throw new CustomException(error.message, error.code);
      else throw new CustomException("Error", 500);
    }
  };

  deleteUserById = async (idUser: string) => {
    try {
      const user = await this.getUserByFilter({ _id: idUser });
      await User.deleteOne({ _id: user._id });
    } catch (error: any) {
      if (error.code) throw new CustomException(error.message, error.code);
      else throw new CustomException("Error", 500);
    }
  };
}

export default new UserService();
