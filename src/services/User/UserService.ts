import { HttpStatus } from "../../exceptions/HttpStatus";
import User from "../../models/UserModel";
import { CreateUser, UpdateUser } from "../../types";
import Exception from "../../exceptions/Exception";

class UserService {
  create = async (object: CreateUser) => {
    try {
      const user = await User.create(object);
      return user._id;
    } catch (error: any) {
      throw new Exception(error.message, error.code);
    }
  };

  findAll = async () => {
    try {
      return await User.find();
    } catch (error: any) {
      throw new Exception(error.message, error.code);
    }
  };

  findById = async (_id: string) => {
    try {
      const user = await User.findOne({ _id, disabled: false });
      if (!user) throw new Exception("User not found", HttpStatus.NOT_FOUND);
      return user;
    } catch (error: any) {
      throw new Exception(error.message, error.code);
    }
  };

  findByEmail = async (email: string) => {
    try {
      const user = await User.findOne({ email: email, disabled: false });
      if (!user) throw new Exception("User not found", HttpStatus.NOT_FOUND);
      return user;
    } catch (error: any) {
      throw new Exception(error.message, error.code);
    }
  };

  updateById = async (id: string, update: UpdateUser) => {
    try {
      const user = await this.findById(id);

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

  softDelete = async (id: string, disabled: boolean) => {
    try {
      const user = await this.findById(id);
      await User.updateOne({ _id: user._id }, { disabled });
    } catch (error: any) {
      throw new Exception(error.message, error.code);
    }
  };

  deleteById = async (id: string) => {
    try {
      const user = await this.findById(id);
      await User.deleteOne({ _id: user._id });
    } catch (error: any) {
      throw new Exception(error.message, error.code);
    }
  };
}

export default new UserService();
