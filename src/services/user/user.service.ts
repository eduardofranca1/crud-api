import { Exception, HttpStatus } from "../../exceptions";
import User from "../../models/user";
import { CreateUser, UpdateUser } from "../../types";

class UserService {
  create = async (object: CreateUser) => {
    const user = await User.create(object);
    const result = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    return result;
  };

  findAll = async () => {
    return await User.find();
  };

  findById = async (_id: string) => {
    const user = await User.findOne({ _id });
    if (!user) throw new Exception("User not found", HttpStatus.NOT_FOUND);
    return user;
  };

  findByEmail = async (email: string) => {
    const user = await User.findOne({ email: email, disabled: false });
    if (!user) throw new Exception("User not found", HttpStatus.NOT_FOUND);
    return user;
  };

  updateById = async (id: string, dataToUpdate: UpdateUser) => {
    const user = await this.findById(id);
    if (user.email !== dataToUpdate.email) {
      const emailExists = await User.findOne({ email: dataToUpdate.email });
      if (emailExists) {
        throw new Exception("Email already exists", HttpStatus.BAD_REQUEST);
      }
    }
    await User.updateOne({ _id: user._id }, dataToUpdate);
  };

  disabled = async (id: string) => {
    const user = await this.findById(id);
    await User.updateOne({ _id: user._id }, { disabled: !user.disabled });
  };

  deleteById = async (id: string) => {
    const user = await this.findById(id);
    await User.deleteOne({ _id: user._id });
  };
}

export default new UserService();
