import { IRegister } from "./IRegister";

export interface IAuth {
    email: string;
    password: string;
}

export interface IAuthResponse {
    status: IAuthResponseData;
}

interface IAuthResponseData {
    code:         number;
    message:      string;
    data:         IRegister;
    access_token: string;
} 