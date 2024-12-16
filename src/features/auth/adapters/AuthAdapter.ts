import { IAuth, IAuthResponse } from "../models/IAuth";
import { IUser } from "../../users/models/IUser";
import { IRegister } from "../models/IRegister";

export class AuthAdapter {
  static toDomain(data: IAuthResponse): IRegister {
    return {
      id: data.status.data.id,
      email: data.status.data.email,
      password: data.status.data.password,
      name: data.status.data.name,
      lastname: data.status.data.lastname,
      address: data.status.data.address,
      phone: data.status.data.phone,
      birthdate: data.status.data.birthdate,
      username: data.status.data.username,
      role: data.status.data.role
    };
  }
}
