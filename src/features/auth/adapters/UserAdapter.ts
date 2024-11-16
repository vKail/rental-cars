import { IAuth, IAuthResponse } from "../models/IAuth";
import { IUser } from "../models/IUser";

export class UserAdapter {
  static toDomain(data: IAuthResponse): IUser {
    return {
      email: data.status.data.email,
      password: data.status.data.password,
      name: data.status.data.name,
      lastname: data.status.data.lastname,
      address: data.status.data.address,
      phone: data.status.data.phone,
      birthdate: data.status.data.birthdate,
      username: data.status.data.username,
    };
  }
}
