import * as yup from "yup";

export const authSchema = yup.object().shape({
  body: yup.object().shape({
    email: yup.string().required().label("Enter your email to continue"),
    password: yup.string().required().label("Enter your password to continue"),
  }),
});

export type AuthSchema = yup.TypeOf<typeof authSchema>;
