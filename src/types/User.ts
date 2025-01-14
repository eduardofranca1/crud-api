export interface User {
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  disabled: boolean;
}

export type UpdateUser = Omit<
  User,
  "password" | "disabled" | "createdAt" | "updatedAt"
>;

export type CreateUser = {
  name: string;
  email: string;
  password: string;
};
