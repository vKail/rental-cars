export interface IRecoveryEmail {
    email: string;
}

export interface IRecoveryPassword {
    reset_password_token:  string;
    password:              string;
    password_confirmation: string;
}



