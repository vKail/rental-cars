import { IUser } from "./IUser";

export interface IAuth {
    email: string;
    password: string;
}

export interface IAuthResponse {
    code:         number;
    message:      string;
    data:         IUser;
    access_token: string;
}
