import api from "@/lib/axios";
import { AdminDashboardStats } from "@/types";

export const adminService = {
  dashboard: async () => {
    const { data } = await api.get<AdminDashboardStats>("/admin/dashboard");
    return data;
  },
};