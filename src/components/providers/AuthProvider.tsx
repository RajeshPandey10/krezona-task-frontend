"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.service";
import api from "@/lib/axios";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const refreshResult = await authService.refresh();
        const newToken =
          refreshResult?.access_token ||
          refreshResult?.accessToken ||
          refreshResult?.token;
        if (newToken) {
          useAuthStore.setState({ token: newToken });
          api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          const response = await authService.getProfile();
          const user = response.user || response;
          setUser(user);
          return;
        }
      } catch (error) {}

      useAuthStore.setState({
        isLoading: false,
        token: null,
        user: null,
        initialized: true,
      });
    };

    if (isLoading) {
      initializeAuth();
    }
  }, [isLoading, setUser]);

  return <>{children}</>;
}
