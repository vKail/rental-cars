import { HttpHandler } from "@/core/interfaces/HttpHandler"
import { IAuth, IAuthResponse } from "../models/IAuth"
import { AxiosClient } from "@/core/infrestructure/http/AxiosClient"
import { IUser } from "../models/IUser"
import { setToken } from "@/core/providers/TokenUtils"
import { UserAdapter } from "../adapters/UserAdapter"
import { IRecoveryEmail } from "../models/IRecovery"


 interface  AuthDataSource {
    login: (data: IAuth) => Promise<IUser>
    signup: (data: IUser) => Promise<IUser>
    recoveryPassword: (data: IRecoveryEmail) => Promise<void>
    logout: () => void
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

    async logout(): Promise<void> {
        setToken('')
    }

    async recoveryPassword(email: IRecoveryEmail): Promise<void> {
        await this.httpClient.post('users/recovery_password', { email })
    }

    static getInstance(): AuthDataSource {
        return new AuthDataSourceImpl()
    }
    
}