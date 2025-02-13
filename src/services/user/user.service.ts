import { compare } from "bcryptjs";
import { Exception, HttpEnumStatusCode } from "../../exceptions";
import User from "../../models/user";
import { CreateUser, UpdateUser } from "../../types";
import { UpdatePassword } from "../../types/password";
import { FilterOptions } from "../../types/filter";

class UserService {
  create = async (object: CreateUser) => {
    const user = await User.create(object);
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
  };

  findAll = async () => await User.find();

  findById = async (_id: string, options?: FilterOptions) => {
    const user = await User.findOne({ _id }).select(
      options?.select ?? undefined
    );
    if (!user)
      throw new Exception("User not found", HttpEnumStatusCode.NOT_FOUND);
    return user;
  };

  findByEmail = async (email: string) => {
    const user = await User.findOne({ email: email, disabled: false });
    if (!user)
      throw new Exception("User not found", HttpEnumStatusCode.NOT_FOUND);
    return user;
  };

  updateById = async (id: string, dataToUpdate: UpdateUser) => {
    const user = await this.findById(id);
    if (user.email !== dataToUpdate.email) {
      const emailExists = await User.findOne({ email: dataToUpdate.email });
      if (emailExists) {
        throw new Exception(
          "Email already exists",
          HttpEnumStatusCode.BAD_REQUEST
        );
      }
    }
    await User.updateOne({ _id: user._id }, dataToUpdate);
  };

  updatePassword = async (id: string, objectPassword: UpdatePassword) => {
    const user = await this.findById(id, { select: "password" });

    const passwordMatch = await compare(
      objectPassword.oldPassword,
      user.password
    );

    if (!passwordMatch) {
      throw new Exception(
        "Passwords don't match",
        HttpEnumStatusCode.BAD_REQUEST
      );
    }

    await User.updateOne({ _id: id }, { password: objectPassword.newPassword });
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
