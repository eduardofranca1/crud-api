export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IAuthenticationRequest {
  email: string;
  password: string;
}
