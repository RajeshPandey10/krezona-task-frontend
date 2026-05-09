"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users2, ShieldCheck, ShieldUser } from "lucide-react";

export default function UsersStats({
  total,
  active,
  subscribed,
}: {
  total: number;
  active: number;
  subscribed: number;
}) {
  const items = [
    { label: "Users", value: total, Icon: Users2 },
    { label: "Active", value: active, Icon: ShieldCheck },
    { label: "Subscribed", value: subscribed, Icon: ShieldUser },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[28rem]">
      {items.map(({ label, value, Icon }) => (
        <Card
          key={label}
          className="border-zinc-800 bg-zinc-950/75 backdrop-blur"
        >
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-300">
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
