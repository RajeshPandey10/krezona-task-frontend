"use client";

import { useCallback, useState } from "react";
import { LoginLogEntry } from "@/types";
import { logsService } from "@/services/logs.service";

export function useLogs() {
  const [logs, setLogs] = useState<LoginLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async (userId?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      let data: LoginLogEntry[] = [];

      if (userId === "me") {
        data = await logsService.listMe();
      } else if (userId) {
        data = await logsService.listByUserId(userId);
      } else {
        data = await logsService.list();
      }

      setLogs(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load logs";
      setError(message);
      console.error("Failed to fetch logs:", err);
      setLogs([]);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    logs,
    isLoading,
    error,
    fetchLogs,
  };
}