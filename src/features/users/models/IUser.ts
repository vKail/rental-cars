export interface IUser {
 id: number; email: string; password: string;
  name: string;
  lastname: string;
  address: string;
  role: string;
  phone: string;
  birthdate: Date;
  username: string;
}

export interface IUserCreate extends Omit<IUser, 'id'>{}

export interface IUserRegister extends Omit<IUser, 'id' | 'role'>{}

export interface IUserResponse {
  code: number;
  message: string;
  data: IUser;
}

export enum UserRoles {
  CLIENT = 'client',
  ADMINISTRATOR = 'administrator',
  USER = 'user'
}