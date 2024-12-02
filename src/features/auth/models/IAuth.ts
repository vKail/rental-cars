import { IUser } from "../../users/models/IUser";

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
    data:         IUser;
    access_token: string;
} 