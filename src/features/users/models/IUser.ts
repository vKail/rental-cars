export interface IUser {
 id: number;
  email: string;
  password: string;
  name: string;
  lastname: string;
  address: string;
  role: string;
  phone: string;
  birthdate: Date;
  username: string;
}

export interface IUserResponse {
  code: number;
  message: string;
  data: IUser;
}
