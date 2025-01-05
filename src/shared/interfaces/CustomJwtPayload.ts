interface CustomJwtPayload {
  id: string;
  email: string;
  name: string;
  lastname: string;
  username: string;
  role: string;
  sub: string;
  scp: string;
  aud: null;
  iat: number;
  exp: number;
}