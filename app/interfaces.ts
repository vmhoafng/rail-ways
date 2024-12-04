export interface LoginResponse {
  status?: number;
  message?: string;
  result?: {
    accessToken?: string;
    refreshToken: {
      name: string;
      value: string;
    };
    profile: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      password?: string;
    };
  };
}
export interface CookieType extends LoginResponse {
  super(accessToken: string, refreshToken: string): void;
  token: string;
  expiresAt: string;
}
export interface RegisterResponse {
  error?: string;
  message?: string;
  result?: {
    id: number;
    email: string;
    phone: string;
    address?: string;
  };
}
export interface LoginBodyType {
  email: string;
  password: string;
}
export interface RegisterBodyType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}
export interface AuthBodyType {
  accessToken?: string;
  refreshToken?: {
    name: string;
    value: string;
  };
  profile?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    password?: string;
  };
}
export interface AuthResponse {
  error?: string;
  message?: string;
  result?: {
    accessToken: string;
    refreshToken: {
      name: string;
      value: string;
    };
    profile: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address?: string;
      password?: string;
    };
  };
}
export interface AccessToken {
  accessToken: string;
}
export interface AuthHeaderRefreshToken {
  accessToken: string;
}
export interface AuthResponseRefreshToken {
  accessToken: string;
  refreshToken: {
    name: string;
    value: string;
  };
}
export interface VerifyTokenBodyType {
  email: string;
  token: number;
}
export interface VerifyTokenResponse {
  error?: string;
  message?: string;
  result?: {
    email: string;
    token: number;
  };
}
export interface UpdateProfileBodyType {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  phone?: string;
  oldPassword?: string;
}

export interface UpdateProfileResponse {
  errorDescription: string;
  code: number;
  error: string;
  validationErrors: null;
}
export interface AuthProfileResponse {
  result: {
    accessToken: string;
    profile: {
      email: string;
      firstName: string;
      lastName: string;
      phone: string;
      password: string;
    };
  };
}
export interface getAllResponse {
  message: string;
  result: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    createdDate: string;
    roleName: string[];
  }[];
  status: number;
}
