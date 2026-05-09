"use client";

import { useEffect, useState } from "react";
import { useLogs } from "@/hooks/useLogs";
import { useAuthStore } from "@/store/auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

function formatDateTime(value: string) {
  return new Date(value).toLocaleString([], {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function getStatusIcon(success: boolean) {
  return success ? (
    <CheckCircle className="h-4 w-4 text-emerald-400" />
  ) : (
    <AlertCircle className="h-4 w-4 text-red-400" />
  );
}

export function EngineerLoginLogs() {
  const { user } = useAuthStore();
  const { logs, isLoading, error, fetchLogs } = useLogs();
  const [displayLogs, setDisplayLogs] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchLogs("me").catch(() => undefined);
    }
  }, [user?.id, fetchLogs]);

  if (!displayLogs || !user?.id) {
    return null;
  }

  if (isLoading) {
    return (
      <Card className="border-zinc-800 bg-zinc-900/80">
        <CardContent className="flex items-center justify-center p-6">
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock className="h-4 w-4 animate-spin" />
            Loading activity...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-zinc-800 bg-zinc-900/80">
      <CardHeader className="border-b border-zinc-800/80">
        <CardTitle className="text-lg">Login Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {error ? (
          <div className="p-6 text-sm text-zinc-400">
            Unable to load activity logs
          </div>
        ) : logs.length === 0 ? (
          <div className="p-6 text-sm text-zinc-400 text-center">
            No login activity recorded
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {logs.slice(0, 5).map((log, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 hover:bg-zinc-800/30 transition"
              >
                <div className="flex items-center gap-3 flex-1">
                  {getStatusIcon(log.success)}
                  <div className="flex-1">
                    <p className="text-sm text-zinc-200">
                      {log.success
                        ? "Successful login"
                        : "Failed login attempt"}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {log.ip || "Unknown IP"} •{" "}
                      {log.userAgent
                        ? log.userAgent.substring(0, 30) + "..."
                        : "Unknown device"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-400">
                    {formatDateTime(log.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {logs.length > 5 && (
          <div className="p-4 text-center border-t border-zinc-800">
            <p className="text-xs text-zinc-500">
              Showing latest 5 of {logs.length} login attempts
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
