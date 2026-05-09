"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { LoginLogEntry } from "@/types";

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

export default function LogsTable({
  logs,
  isLoading,
}: {
  logs: LoginLogEntry[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-zinc-400">
        Loading logs...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-b-3xl border-t border-zinc-800">
      <div className="grid grid-cols-12 gap-4 border-b border-zinc-800 bg-zinc-900/80 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
        <div className="col-span-3">User</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-3">Time</div>
        <div className="col-span-2">IP</div>
        <div className="col-span-2">Device</div>
      </div>

      <div className="divide-y divide-zinc-800">
        {logs.map((log) => (
          <div
            key={log.id}
            className="grid grid-cols-12 gap-4 px-6 py-4 text-sm text-zinc-300"
          >
            <div className="col-span-3 space-y-1">
              <p className="font-medium text-white">{getFullName(log.user)}</p>
              <p className="text-xs text-zinc-500">
                {log.email || log.user?.email || "No email"}
              </p>
            </div>
            <div className="col-span-2 flex items-start">
              <Badge
                variant="outline"
                className={
                  log.success
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                    : "border-red-500/30 bg-red-500/10 text-red-300"
                }
              >
                {log.success ? (
                  <>
                    <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Success
                  </>
                ) : (
                  <>
                    <AlertTriangle className="mr-1 h-3.5 w-3.5" /> Failed
                  </>
                )}
              </Badge>
            </div>
            <div className="col-span-3 text-zinc-400">
              {formatDateTime(log.createdAt)}
            </div>
            <div className="col-span-2 text-zinc-400">
              {log.ip || "Unknown"}
            </div>
            <div className="col-span-2 text-zinc-500">
              {shortenUserAgent(log.userAgent)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
