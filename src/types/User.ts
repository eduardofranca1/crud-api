export interface User {
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  disabled: boolean;
}

export interface UpdateUser {
  name: string;
  email: string;
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
}
