import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { IUser } from "../interfaces/types";
import { User } from "../models";
import { UserDocument } from "../models/user.model";

class UserService {
  createUser = async (input: IUser) => {
    try {
      const user = await User.create(input);
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  listAllUsers = async () => {
    try {
      const users = await User.find();
      return users;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  getUserById = async (query: FilterQuery<UserDocument>) => {
    try {
      const user = await User.findOne(query).lean();
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  updateUserById = async (
    query: FilterQuery<UserDocument>,
    update: UpdateQuery<UserDocument>,
    options: QueryOptions
  ) => {
    try {
      const updatedUser = await User.findOneAndUpdate(query, update, options);
      return updatedUser;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  deleteUserById = async (query: FilterQuery<UserDocument>) => {
    try {
      return User.deleteOne(query);
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

export default new UserService();
