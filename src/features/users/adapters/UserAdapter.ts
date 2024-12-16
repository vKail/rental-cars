import { IRegisterResponse } from "@/features/auth/models/IRegister";
import { IUser } from "../models/IUser";

export class UserAdapter {
  static toDomain(data: IRegisterResponse): Omit<IUser, 'id' | 'jti'> {
    return {
      email: data.status.data.email,
      password: data.status.data.password,
      name: data.status.data.name,
      lastname: data.status.data.lastname,
      address: data.status.data.address,
      phone: data.status.data.phone,
      birthdate: data.status.data.birthdate,
      username: data.status.data.username,
      role: data.status.data.role,
    };
  }
}
