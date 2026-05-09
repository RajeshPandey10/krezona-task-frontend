"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock3, ShieldCheck, ShieldAlert } from "lucide-react";

type Stat = { label: string; value: number; icon: React.ComponentType<any> };

export default function LogsStats({
  total,
  success,
  failed,
}: {
  total: number;
  success: number;
  failed: number;
}) {
  const stats: Stat[] = [
    { label: "Total", value: total, icon: Clock3 },
    { label: "Success", value: success, icon: ShieldCheck },
    { label: "Failed", value: failed, icon: ShieldAlert },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map(({ label, value, icon: Icon }) => (
        <Card
          key={label}
          className="border-zinc-800 bg-zinc-950/75 backdrop-blur"
        >
          <CardContent className="flex justify-center items-center gap-3 p-4">
            <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-300 ">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                {label}
              </p>
              <p className="text-sm font-semibold text-white">{value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
