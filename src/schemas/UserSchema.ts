import * as yup from "yup";

export const userSchema = yup.object().shape({
  body: yup.object().shape({
    name: yup.string().required().label("Name is required."),
    email: yup.string().email().required().label("Enter a valid email."),
    password: yup
      .string()
      .required()
      .min(8)
      .label("Password must be at least 8 characters long"),
  }),
});

export const userSchemaQuery = yup.object().shape({
  query: yup
    .object()
    .shape({
      _id: yup.string().required().label("User id is required"),
    })
    .required(),
});

export type UserSchema = yup.TypeOf<typeof userSchema>;
export type UserSchemaQuery = yup.TypeOf<typeof userSchemaQuery>;
