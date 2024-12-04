"use client";

import { useEffect, useContext, useState, createContext } from "react";
import authApiRequest from "@/app/apiRequests/auth";
import { UpdateProfileBodyType } from "@/app/interfaces";
import { activateWebSocket, deactivateWebSocket } from "@/app/web-socket/websocket-client";

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

  const setAccessToken = (token: string | null) => {
    if (token) {
      const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // Expiration: 1 day
      localStorage.setItem("accessToken", token);
      localStorage.setItem("accessTokenExpiry", expiryTime.toString());
      setAccessTokenState(token);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("accessTokenExpiry");
      setAccessTokenState(null);
    }
  };

  const refreshToken = async () => {
    try {
      if (!accessToken) throw new Error("AccessToken is missing.");
      const response = await authApiRequest.auth.refreshToken(accessToken);
      setAccessToken(response.payload.accessToken);
    } catch (error) {
      console.error("Failed to refresh accessToken:", error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAccessToken(null);
    setProfile(null);
    deactivateWebSocket();
    localStorage.clear();
  };

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

  useEffect(() => {
    if (isLoggedIn && accessToken) {
      activateWebSocket(accessToken, handleLogout);
    }

    return () => {
      deactivateWebSocket();
    };
  }, [isLoggedIn, accessToken]);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        profile,
        setLoggedIn: setIsLoggedIn,
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
