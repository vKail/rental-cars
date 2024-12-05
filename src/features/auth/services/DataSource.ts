import { HttpHandler } from "@/core/interfaces/HttpHandler"
import { IAuth, IAuthResponse } from "../models/IAuth"
import { AxiosClient } from "@/core/infrestructure/http/AxiosClient"
import { IUser } from "../../users/models/IUser"
import { setToken } from "@/core/providers/TokenUtils"
import { IRecoveryEmail, IRecoveryPassword } from "../models/IRecovery"
import { AuthAdapter } from "../adapters/AuthAdapter"


 interface  AuthDataSource {
    login: (data: IAuth) => Promise<Partial<IUser>>
    signup: (data: Omit<IUser, 'id'>) => Promise<Partial<IUser>>
    recoveryPassword: (data: IRecoveryEmail) => Promise<void>
    changePassword: (data: Partial<IRecoveryPassword>) => Promise<void>
    logout: () => void
}

 export class AuthDataSourceImpl implements AuthDataSource {
   private httpClient: HttpHandler

   constructor() {
         this.httpClient = AxiosClient.getInstance()
    }

    async login(user: IAuth): Promise<Partial<IUser>> {
        const response = await this.httpClient.post<IAuthResponse>('users/sign_in', { user })
        response.status.access_token && setToken(response.status.access_token)
        return AuthAdapter.toDomain(response)
    }

    async signup(user: Omit<IUser, 'id'>): Promise<Partial<IUser>> {
        const response = await this.httpClient.post<IAuthResponse>('users', { user })
        return AuthAdapter.toDomain(response)
    }

    async logout(): Promise<void> {
        setToken('')
    }

    async recoveryPassword(user: IRecoveryEmail): Promise<void> {
        await this.httpClient.post('users/password', { user })
    }

    async changePassword(user: Partial<IRecoveryPassword>): Promise<void> {
        await this.httpClient.put('users/password', { user })
    }

    static getInstance(): AuthDataSource {
        return new AuthDataSourceImpl()
    }
    
}