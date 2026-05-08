import { AuthState } from "@/types";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: null,
    isLoading: true,
    login: (token, user) => {
        localStorage.setItem('access_token', token);
        set({ token, user, isLoading: false });
    },
    logout: () => {
        localStorage.removeItem('access_token');
        set({ token: null, user: null });
        window.location.href = '/login';
    },
    setUser: (user) => set({ user }),
    hasRole: (roles) => {
        const user = get().user;
        return user ? roles.includes(user.role) : false;
    }
}
))