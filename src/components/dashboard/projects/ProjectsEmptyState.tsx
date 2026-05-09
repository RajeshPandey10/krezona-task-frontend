"use client";

import Link from "next/link";
import { FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectsEmptyStateProps {
  search: string;
  canCreate: boolean;
}

export function ProjectsEmptyState({
  search,
  canCreate,
}: ProjectsEmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-950/60 px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
        <FolderOpen className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-white">
        No projects found
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-400">
        {search
          ? "No project matches your search. Try a different name, owner, or type."
          : "Create the first project to start tracking work across the dashboard."}
      </p>
      {canCreate && !search && (
        <Button
          asChild
          className="mt-6 h-11 rounded-xl bg-emerald-500 px-5 text-zinc-950 hover:bg-emerald-400"
        >
          <Link href="/dashboard/projects/new">Create project</Link>
        </Button>
      )}
    </div>
  );
}
