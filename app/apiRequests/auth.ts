import http from "@/lib/http";
import {
  AccessToken,
  AuthBodyType,
  AuthHeaderRefreshToken,
  AuthProfileResponse,
  AuthResponse,
  LoginBodyType,
  LoginResponse,
  RegisterBodyType,
  RegisterResponse,
  UpdateProfileBodyType,
  UpdateProfileResponse,
  VerifyTokenBodyType,
  VerifyTokenResponse,
} from "../interfaces";

const authApiRequest = {
  // Nhóm API liên quan đến xác thực
  auth: {
    login: (body: LoginBodyType) =>
      http.post<LoginResponse>("/api/v1/auth/anonymous/login", body),
    redirectLoginGoogle: () =>
      http.get<{ linkLoginGoogle: string }>(
        "/api/v1/auth/anonymous/oauth2/login"
      ),
    register: (body: RegisterBodyType) =>
      http.post<RegisterResponse>("/api/v1/auth/anonymous/register", body),
    refreshToken: (accessToken: string | undefined) =>
      http.get<AuthHeaderRefreshToken>(
        "/api/v1/maketing/anonymous/refreshToken",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "omit",
        }
      ),
    verifyToken: (body: VerifyTokenBodyType) =>
      http.post<VerifyTokenResponse>(
        "/api/v1/marketing/anonymous/verify-token",
        body,
        {}
      ),
    updateProfile: (
      body: UpdateProfileBodyType,
      accessToken: string | undefined
    ) =>
      http.post<UpdateProfileResponse>("/api/v1/auth/update-user", body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
  },

  // Nhóm API liên quan đến quên mật khẩu
  password: {
    preResetPassword: (email: string) =>
      http.post("/api/v1/auth/anonymous/pre-reset-password", { email }),

    resetPassword: (body: { id: string | null; password: string }) =>
      http.post("/api/v1/auth/anonymous/reset-password", body),
  },

  // Nhóm API liên quan đến đăng xuất
  logout: {
    logout: (accessToken: string | null) =>
      http.get("/api/v1/auth/log-out", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "omit",
      }),
  },
};

export default authApiRequest;
