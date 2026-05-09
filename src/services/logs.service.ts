import api from "@/lib/axios";
import { LoginLogEntry } from "@/types";

export const logsService = {
  list: async (userId?: string) => {
    const { data } = await api.get<LoginLogEntry[]>("/logs", {
      params: userId ? { userId } : undefined,
    });
    return data;
  },

  listByUserId: async (userId: string) => {
    const { data } = await api.get<LoginLogEntry[]>(`/logs/${userId}`);
    return data;
  },
};