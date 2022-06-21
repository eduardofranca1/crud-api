import * as yup from "yup";

export const loginSchema = yup.object().shape({
  body: yup.object().shape({
    email: yup.string().required().label("Enter your email to continue"),
    password: yup.string().required().label("Enter your password to continue"),
  }),
});

export type LoginSchema = yup.TypeOf<typeof loginSchema>;
