import api from "@/lib/axios";
import { AdminDashboardStats, AdminUser } from "@/types";

export const adminService = {
    dashboard: async () => {
        const { data } = await api.get<AdminDashboardStats>("/admin/dashboard");
        return data;
    },

    getUsers: async () => {
        const { data } = await api.get<AdminUser[]>("/admin/users");
        return data;
    },

    getUserById: async (id: string) => {
        const { data } = await api.get<AdminUser>(`/admin/users/${id}`);
        return data;
    },

    createUser: async (payload: { email: string; password: string; firstName?: string; lastName?: string; roleId?: string }) => {
        const { data } = await api.post<AdminUser>(`/admin/users`, payload);
        return data;
    },

    updateUser: async (id: string, payload: Partial<{ email: string; password: string; firstName: string; lastName: string; roleId?: string }>) => {
        const { data } = await api.patch<AdminUser>(`/admin/users/${id}`, payload);
        return data;
    },

    deleteUser: async (id: string) => {
        const { data } = await api.delete(`/admin/users/${id}`);
        return data;
    },
};