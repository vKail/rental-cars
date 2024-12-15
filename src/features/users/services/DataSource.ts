import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { IUser, IUserCreate} from "../models/IUser";
import { AxiosClient } from "@/core/infrestructure/http/AxiosClient";
import { UserAdapter } from "../adapters/UserAdapter";
import toast from "react-hot-toast";
import { IAuthResponse } from "@/features/auth/models/IAuth";
import { IRegisterResponse } from "@/features/auth/models/IRegister";

interface DataSource {
  getAllUsers: () => Promise<IUser[]>;
  getUserById: (id: number) => Promise<IUser>;
  createUser: (data: IUserCreate) => Promise<Omit<IUser, 'id' | 'jti' >>;
  updateUser: (id: number, data: IUserCreate) => Promise<Omit<IUser, 'id' | 'jti' >>;
  deleteUser: (id: number) => Promise<void>;
}

export class UserDataSourceImpl implements DataSource {
  private httpClient: HttpHandler;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }

  async getAllUsers(): Promise<IUser[]> {
      const response = await this.httpClient.get<IUser[]>("api/v1/users");
      return response;
    }

  async getUserById(id: number): Promise<IUser> {
      const response = await this.httpClient.get<IUser>(`/api/v1/users/${id}`);
      return response;
    }

  async createUser(user: IUserCreate): Promise<Omit<IUser, 'id' | 'jti' >> {
      const response = await this.httpClient.post<IRegisterResponse>("users", {
        user,
      });
      return UserAdapter.toDomain(response);
  }

  async updateUser(id: number, user: IUserCreate): Promise<Omit<IUser, 'id' | 'jti' >> {
      const response = await this.httpClient.put<IUser>(`api/v1/users/${id}`, {
        user,
      });
      return response;
  }

  async deleteUser(id: number): Promise<void> {
    const response = await this.httpClient.delete(`api/v1/users/${id}`);
  }

  static getInstance(): DataSource {
    return new UserDataSourceImpl()
  }
}