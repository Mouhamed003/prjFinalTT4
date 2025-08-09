export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio?: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bio?: string;
}
