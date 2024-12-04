"use client";

import { useEffect, useContext, useState, createContext } from "react";
import authApiRequest from "@/app/apiRequests/auth";
import { UpdateProfileBodyType } from "@/app/interfaces";
import { connectWebSocket, disconnectWebSocket, stompClient } from "@/app/web-socket/websocket-client";
import { setupBlockListener } from "@/app/web-socket/block-listener";

interface UserContextType {
  isLoggedIn: boolean;
  profile: UpdateProfileBodyType | null;
  setLoggedIn: (loggedIn: boolean) => void;
  setProfile: (profile: UpdateProfileBodyType | null) => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  refreshToken: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<UpdateProfileBodyType | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);

  const currentUserId = profile?.id;
  console.log("id: ", currentUserId);

  // Hàm lưu accessToken và thời gian hết hạn
  const saveAccessToken = (token: string, expiryTime: number) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("accessTokenExpiry", expiryTime.toString());
    setAccessTokenState(token);
  };

  const setAccessToken = (token: string | null) => {
    if (token) {
      const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // Thời hạn 1 ngày
      saveAccessToken(token, expiryTime);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("accessTokenExpiry");
      setAccessTokenState(null);
    }
  };

  const refreshToken = async () => {
    try {
      if (!accessToken) {
        throw new Error("AccessToken is invalid or missing.");
      }
      const response = await authApiRequest.auth.refreshToken(accessToken);
      const newAccessToken = response.payload.accessToken;
      const newExpiryTime = Date.now() + 24 * 60 * 60 * 1000; // Thời hạn mới là 1 ngày
      saveAccessToken(newAccessToken, newExpiryTime);
      console.log("AccessToken refreshed successfully.");
    } catch (error) {
      console.error("Failed to refresh accessToken:", error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAccessToken(null);
    setProfile(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessTokenExpiry");
    // window.location.href = "/auth"; // Điều hướng tới trang đăng nhập
  };

  // Lập lịch tự động làm mới accessToken
  useEffect(() => {
    if (!accessToken) return;

    const expiryTime = localStorage.getItem("accessTokenExpiry");
    if (!expiryTime) return;

    const timeRemaining = parseInt(expiryTime, 10) - Date.now();
    const refreshTime = timeRemaining - 10 * 60 * 1000; // Làm mới trước 10 phút

    const timer = setTimeout(() => {
      refreshToken();
    }, Math.max(refreshTime, 0));

    return () => clearTimeout(timer); // Xóa lịch khi accessToken thay đổi
  }, [accessToken]);

  // Kiểm tra trạng thái đăng nhập khi ứng dụng khởi động
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const expiryTime = localStorage.getItem("accessTokenExpiry");

    if (token && expiryTime && Date.now() < parseInt(expiryTime, 10)) {
      setAccessToken(token);
      setIsLoggedIn(true);
    } else {
      handleLogout();
    }
  }, []);

  // Kết nối WebSocket và thiết lập listener khi người dùng đăng nhập
  useEffect(() => {
    if (isLoggedIn) {
      connectWebSocket();
    }

    return () => {
      if (isLoggedIn) {
        disconnectWebSocket();
      }
    };
  }, [isLoggedIn]);

  useEffect(() => {
    if (stompClient.connected && isLoggedIn) {
      setupBlockListener(currentUserId, handleLogout);
    }
  }, [stompClient.connected, isLoggedIn, currentUserId]);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        profile,
        setLoggedIn: (loggedIn) => setIsLoggedIn(loggedIn),
        setProfile,
        accessToken,
        setAccessToken,
        refreshToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
