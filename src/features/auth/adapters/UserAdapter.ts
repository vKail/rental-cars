import { IAuth, IAuthResponse } from "../models/IAuth";
import { IUser } from "../models/IUser";

export class UserAdapter {
  static toDomain(data: IAuthResponse): IUser {
    return {
      email: data.data.email,
      password: data.data.password,
      name: data.data.name,
      lastname: data.data.lastname,
      address: data.data.address,
      phone: data.data.phone,
      birthdate: data.data.birthdate,
      username: data.data.username,
    };
  }
}
