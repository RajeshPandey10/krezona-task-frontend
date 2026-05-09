"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.service";
import api from "@/lib/axios";

function decodeToken(token: string) {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(
      base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "="),
    );
    return JSON.parse(decoded) as {
      sub?: string;
      email?: string;
      role?: string;
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          useAuthStore.setState({ token });
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await authService.getProfile();
          const user = response.user || response;
          setUser(user);
        } else {
          useAuthStore.setState({ isLoading: false, initialized: true });
        }
      } catch (error) {
        const status = (error as any)?.response?.status;
        if (status === 401 || status === 403) {
          localStorage.removeItem("access_token");
          api.defaults.headers.common["Authorization"] = undefined;
          useAuthStore.setState({
            isLoading: false,
            token: null,
            user: null,
            initialized: true,
          });
          return;
        }

        const token = localStorage.getItem("access_token");
        const decoded = token ? decodeToken(token) : null;
        if (token) {
          useAuthStore.setState({
            token,
            user: decoded
              ? {
                  id: decoded.sub || "",
                  email: decoded.email || "",
                  firstName: decoded.email?.split("@")[0],
                  lastName: undefined,
                  role: (decoded.role as any) || "ENGINEER",
                }
              : null,
            isLoading: false,
            initialized: true,
          });
          return;
        }

        useAuthStore.setState({
          isLoading: false,
          token: null,
          user: null,
          initialized: true,
        });
      }
    };

    if (isLoading) {
      initializeAuth();
    }
  }, [isLoading, setUser]);

  return <>{children}</>;
}
