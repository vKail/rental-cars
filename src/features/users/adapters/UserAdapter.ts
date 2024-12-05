import { IUser, IUserResponse } from "../models/IUser";

export class UserAdapter {
  static toDomain(data: IUserResponse): IUser {
    return {
      id: data.data.id,
      email: data.data.email,
      password: data.data.password,
      name: data.data.name,
      lastname: data.data.lastname,
      address: data.data.address,
      phone: data.data.phone,
      birthdate: data.data.birthdate,
      username: data.data.username,
      role: data.data.role,
    };
  }
}
