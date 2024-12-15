export interface IRegister {
  email: string;
  password: string;
  name: string;
  lastname: string;
  address: string;
  role: string;
  phone: string;
  birthdate: Date;
  username: string;
}

export interface IRegisterResponse {
  status: IRegisterResponseData;
}

export interface IRegisterResponseData {
  code: number;
  message: string;
  data: IRegister;
}
