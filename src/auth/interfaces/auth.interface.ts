export interface JwtPayload {
  userId: number;
  email: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
  };
}

export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    email: string;
  };
}
