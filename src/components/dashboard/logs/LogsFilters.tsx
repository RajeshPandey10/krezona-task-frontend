"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function LogsFilters({
  mode,
  setMode,
  search,
  setSearch,
}: {
  mode: "all" | "success" | "failed";
  setMode: (m: "all" | "success" | "failed") => void;
  search: string;
  setSearch: (s: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-2">
        {[
          { k: "all", l: "All" },
          { k: "success", l: "Success" },
          { k: "failed", l: "Failed" },
        ].map((it) => (
          <Button
            key={it.k}
            variant={mode === (it.k as any) ? "default" : "outline"}
            onClick={() => setMode(it.k as any)}
            className={
              mode === it.k
                ? "rounded-full bg-emerald-500 text-zinc-950 hover:bg-emerald-400"
                : "rounded-full border-zinc-700 bg-zinc-950/40 text-zinc-100 hover:bg-zinc-200"
            }
          >
            {it.l}
          </Button>
        ))}
      </div>

      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search logs by person, email, IP, or device"
          className="h-11 rounded-2xl border-zinc-700/70 bg-zinc-950/60 pl-10 text-zinc-100 placeholder:text-zinc-600"
        />
      </div>
    </div>
  );
}
