import { z } from "zod";
import User from "../../models/UserModel";

// verificar uma forma de pegar o nome da propriedade e colocar no lugar "Field"
export const nonemptyString = z
  .string()
  .trim()
  .min(1, { message: "Field can not be empty" });

export const checkUserEmail = z
  .string({ required_error: "Email is required." })
  .email({ message: "Invalid email address." })
  .refine(async (email) => !(await User.findOne({ email })), {
    message: "Email already exists",
  });

// pesquisar uma forma de pegar o id do usuário que está alterando email
// e buscar pelo _id, e não pelo email
export const checkUpdateUserEmail = z
  .string({ required_error: "Email is required." })
  .email({ message: "Invalid email address." })
  .refine(
    async (email) => {
      console.log("🚀 ~ email:", email);
      const user = await User.findOne({ email });
      console.log("🚀 ~ user:", user!.email);
      if (user!.email !== email) {
        console.log("aqui");
        const verifyEmail = await User.findOne({ email });
        console.log("🚀 ~ verifyEmail:", !verifyEmail);
        return !verifyEmail;
      }
      return true;
    },
    {
      message: "Email already exists",
    }
  );

export const passwordSchema = z
  .string({
    required_error: "Password is required.",
  })
  .trim()
  .min(6, { message: "Password must contain at least 6 characters" });
