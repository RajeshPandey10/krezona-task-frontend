"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useLogs } from "@/hooks/useLogs";
import { LoginLogEntry } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import LogsStats from "@/components/dashboard/logs/LogsStats";
import LogsFilters from "@/components/dashboard/logs/LogsFilters";
import LogsTable from "@/components/dashboard/logs/LogsTable";

function getFullName(user?: LoginLogEntry["user"]) {
  if (!user) return "Anonymous session";
  return (
    [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email
  );
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function shortenUserAgent(userAgent?: string | null) {
  if (!userAgent) return "Unknown device";
  return userAgent.length > 72 ? `${userAgent.slice(0, 72)}...` : userAgent;
}

export default function AdminLogsPage() {
  const router = useRouter();
  const { user, initialized } = useAuthStore();
  const { logs, isLoading, error, fetchLogs } = useLogs();
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<"all" | "success" | "failed">("all");

  useEffect(() => {
    if (!initialized) return;
    if (user?.role !== "ADMIN") {
      router.push("/dashboard");
      return;
    }
    void fetchLogs().catch(() => undefined);
  }, [initialized, user, router, fetchLogs]);

  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase();
    return logs.filter((log) => {
      const matchesMode =
        mode === "all" || (mode === "success" ? log.success : !log.success);
      if (!matchesMode) return false;
      if (!query) return true;

      return [getFullName(log.user), log.email, log.ip, log.userAgent]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
  }, [logs, mode, search]);

  const total = logs.length;
  const successCount = logs.filter((log) => log.success).length;
  const failedCount = total - successCount;

  if (!initialized || user?.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="space-y-8 text-zinc-100">
      <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-linear-to-br from-zinc-950 via-zinc-900 to-emerald-950/40 p-8 shadow-2xl shadow-black/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_30%)]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
         
          <div className="grid gap-3 sm:grid-cols-3 justify-end">
            <LogsStats
              total={total}
              success={successCount}
              failed={failedCount}
            />
          </div>
        </div>
      </section>

      <Card className="border-zinc-800 bg-zinc-950/70 shadow-lg shadow-black/10">
        <CardHeader className="space-y-4 border-b border-zinc-800/80">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-2xl text-white">
                Log explorer
              </CardTitle>
              <p className="mt-1 text-sm text-zinc-400">
                Filter by result or search by name, email, IP, or device string.
              </p>
            </div>
            <LogsFilters
              mode={mode}
              setMode={setMode}
              search={search}
              setSearch={setSearch}
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-zinc-400">
              Loading logs...
            </div>
          ) : error ? (
            <div className="p-6">
              <div className="rounded-3xl border border-red-900/50 bg-red-950/20 p-6 text-red-200">
                {error}
              </div>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="p-8 text-center text-zinc-400">
              No log entries match the current filters.
            </div>
          ) : (
            <LogsTable logs={filteredLogs} isLoading={isLoading} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
