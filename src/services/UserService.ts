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
      const user = await User.findOne({ email }).select("password");

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
      else {
        console.log("aqui error");
        throw new CustomException("Error", 500);
      }
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
      return users;
    } catch (error: any) {
      if (error.code) throw new CustomException(error.message, error.code);
      else throw new CustomException("Error", 500);
    }
  };

  getUserById = async (query: FilterQuery<UserDocument>) => {
    try {
      const user = await User.findOne(query).lean();

      if (!user) throw new CustomException("Not found", HttpStatus.NOT_FOUND);

      return user;
    } catch (error: any) {
      if (error.code) throw new CustomException(error.message, error.code);
      else throw new CustomException("Error", 500);
    }
  };

  updateUserById = async (
    query: FilterQuery<UserDocument>,
    update: UpdateQuery<UserDocument>,
    options: QueryOptions
  ) => {
    try {
      const user = await User.findOne(query).lean();

      if (!user) throw new CustomException("Not found", HttpStatus.NOT_FOUND);

      if (user.email !== update.email) {
        const emailExists = await User.findOne({ email: update.email });
        if (emailExists) {
          throw new CustomException(
            "Email already exists",
            HttpStatus.BAD_REQUEST
          );
        }
      }

      const updatedUser = await User.updateOne(query, update, options);

      return updatedUser;
    } catch (error: any) {
      if (error.code) throw new CustomException(error.message, error.code);
      else throw new CustomException("Error", 500);
    }
  };

  deleteUserById = async (query: FilterQuery<UserDocument>) => {
    try {
      const user = await User.findOne(query).lean();

      if (!user) throw new CustomException("Not found", HttpStatus.NOT_FOUND);

      return User.deleteOne(query);
    } catch (error: any) {
      if (error.code) throw new CustomException(error.message, error.code);
      else throw new CustomException("Error", 500);
    }
  };
}

export default new UserService();
