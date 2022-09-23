import { UpdateQuery } from "mongoose";
import { HttpStatus } from "../../exceptions/HttpStatus";
import User from "../../models/UserModel";
import { IUser } from "../../interfaces/types";
import Exception from "../../exceptions/Exception";

class UserService {
  createUser = async (input: IUser) => {
    try {
      const email = await User.findOne({ email: input.email });

      if (email)
        throw new Exception("Email already exists", HttpStatus.BAD_REQUEST);

      const user = await User.create(input);

      return user;
    } catch (error: any) {
      throw new Exception(error.message, error.code);
    }
  };

  listAllUsers = async () => {
    try {
      const users = await User.find();
      if (!users)
        throw new Exception("There are no users", HttpStatus.NOT_FOUND);
      return users;
    } catch (error: any) {
      throw new Exception(error.message, error.code);
    }
  };

  findUserById = async (idUser: string) => {
    try {
      const user = await User.findOne({ _id: idUser, disabled: false });
      if (!user) throw new Exception("User not found", HttpStatus.NOT_FOUND);
      return user;
    } catch (error: any) {
      throw new Exception(error.message, error.code);
    }
  };

  findUserByEmail = async (email: string) => {
    try {
      const user = await User.findOne({ email: email, disabled: false });
      if (!user) throw new Exception("User not found", HttpStatus.NOT_FOUND);
      return user;
    } catch (error: any) {
      throw new Exception(error.message, error.code);
    }
  };

  updateUserById = async (idUser: string, update: UpdateQuery<IUser>) => {
    try {
      const user = await this.findUserById(idUser);

      if (user.email !== update.email) {
        const emailExists = await User.findOne({ email: update.email });
        if (emailExists) {
          throw new Exception("Email already exists", HttpStatus.BAD_REQUEST);
        }
      }

      await User.updateOne({ _id: user._id }, update);
    } catch (error: any) {
      throw new Exception(error.message, error.code);
    }
  };

  softDelete = async (idUser: string) => {
    try {
      const user = await this.findUserById(idUser);
      await User.updateOne({ _id: user._id }, { disabled: true });
    } catch (error: any) {
      throw new Exception(error.message, error.code);
    }
  };

  deleteUserById = async (idUser: string) => {
    try {
      const user = await this.findUserById(idUser);
      await User.deleteOne({ _id: user._id });
    } catch (error: any) {
      throw new Exception(error.message, error.code);
    }
  };
}

export default new UserService();
