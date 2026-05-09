import { AuthState } from "@/types";
import { create } from "zustand";
import api from "@/lib/axios";

function normalizeRole(role: unknown) {
    if (typeof role === 'string') return role;
    if (role && typeof role === 'object' && 'name' in role) {
        return String((role as { name?: unknown }).name || 'ENGINEER');
    }
    return 'ENGINEER';
}

function normalizeUser(user: any) {
    if (!user) return null;
    return {
        ...user,
        role: normalizeRole(user.role),
    };
}

export const useAuthStore = create<AuthState & { initialized?: boolean }>((set, get) => ({
    user: null,
    token: null,
    isLoading: true,
    initialized: false,
    login: (token, user) => {
        if (token) {
            localStorage.setItem('access_token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            set({ token, user: normalizeUser(user), isLoading: false, initialized: true });
        } else {
            set({ token: null, user: normalizeUser(user), isLoading: false, initialized: true });
        }
    },
    logout: () => {
        localStorage.removeItem('access_token');
        api.defaults.headers.common['Authorization'] = undefined;
        set({ token: null, user: null, isLoading: false, initialized: true });
        window.location.href = '/login';
    },
    setUser: (user) => set({ user: normalizeUser(user), isLoading: false, initialized: true }),
    hasRole: (roles) => {
        const user = get().user;
        return user ? roles.includes(user.role) : false;
    }
}
))