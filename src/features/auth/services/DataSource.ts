import { HttpHandler } from "@/core/interfaces/HttpHandler"
import { IAuth, IAuthResponse } from "../models/IAuth"
import { AxiosClient } from "@/core/infrestructure/http/AxiosClient"
import { IUser } from "../models/IUser"
import { setToken } from "@/core/providers/TokenUtils"
import { UserAdapter } from "../adapters/UserAdapter"


 interface  AuthDataSource {
    login: (data: IAuth) => Promise<IUser>
    signup: (data: IUser) => Promise<IUser>
    //logout: () => Promise<Status>
}

 export class AuthDataSourceImpl implements AuthDataSource {
   private httpClient: HttpHandler

   constructor() {
         this.httpClient = AxiosClient.getInstance()
    }

    async login(user: IAuth): Promise<IUser> {
        const response = await this.httpClient.post<IAuthResponse>('users/sign_in', { user })
        response.status.access_token && setToken(response.status.access_token)
        return UserAdapter.toDomain(response)
    }

    async signup(user: IUser): Promise<IUser> {
        const response = await this.httpClient.post<IAuthResponse>('users', { user })
        return UserAdapter.toDomain(response)
    }

    static getInstance(): AuthDataSource {
        return new AuthDataSourceImpl()
    }
    
}