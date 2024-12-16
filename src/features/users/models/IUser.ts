import { IRegister } from "@/features/auth/models/IRegister";

export interface IUser {
  id:         number;
  email:      string;
  password?:  string;
  // created_at: Date;
  // updated_at: Date;
  jti:        string;
  name:       string;
  lastname:   string;
  address:    string;
  phone:      string;
  birthdate:  Date;
  username:   string;
  role:       string;
}

export interface IUserCreate extends IRegister{}

export interface IUserRegister extends Omit<IRegister, 'role'>{}

export enum UserRoles {
  CLIENT = 'client',
  ADMINISTRATOR = 'administrador',
  USER = 'user'
}