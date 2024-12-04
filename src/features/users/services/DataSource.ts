import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { IUser, IUserResponse } from "../models/IUser";
import { AxiosClient } from "@/core/infrestructure/http/AxiosClient";
import { IAuthResponse } from "@/features/auth/models/IAuth";
import { UserAdapter } from "../adapters/UserAdapter";
import toast from "react-hot-toast";

interface DataSource {
  getAllUsers: () => Promise<IUser[]>;
  getUserById: (id: number) => Promise<IUser>;
  createUser: (data: Omit<IUser, "id">) => Promise<IUser>;
  updateUser: (id: number, data: Omit<IUser, "id">) => Promise<IUser>;
  deleteUser: (id: number) => Promise<void>;
}

export class UserDataSourceImpl implements DataSource {
  private httpClient: HttpHandler;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }

  async getAllUsers(): Promise<IUser[]> {
    try {
      const response = await this.httpClient.get<IUser[]>("api/v1/users");
      return response;
    } catch (error) {
      toast.error("No se puede obtener todos los usuarios");
      throw new Error("Usuarios no encontrados");
    }
  }

  async getUserById(id: number): Promise<IUser> {
    try {
      const response = await this.httpClient.get<IUserResponse>(`/api/v1/users/${id}`);
      return UserAdapter.toDomain(response);
    } catch (error) {
      toast.error("El usuario no se ha encontrado");
      throw new Error("Usuario no encontrado");
    }
  }

  async createUser(user: Omit<IUser, "id">): Promise<IUser> {
    try {
      const response = await this.httpClient.post<IUserResponse>("users", {
        user,
      });
      return UserAdapter.toDomain(response);
    } catch (error) {
      toast.error("No se pudo crear el usuario");
      throw new Error("No se pudo crear el usuario");
    }
  }

  async updateUser(id: number, user: Omit<IUser, "id">): Promise<IUser> {
    try {
      const response = await this.httpClient.put<IUserResponse>(`api/v1/users/${id}`, {
        user,
      });
      return UserAdapter.toDomain(response);
    } catch (error) {
      toast.error("No se pudo actualizar al cliente");
      throw new Error("Error al actualizar el usuario");
    }
  }

  async deleteUser(id: number): Promise<void> {
    const response = await this.httpClient.delete(`users/${id}`);
  }

  static getInstance(): DataSource {
    return new UserDataSourceImpl()
  }
}