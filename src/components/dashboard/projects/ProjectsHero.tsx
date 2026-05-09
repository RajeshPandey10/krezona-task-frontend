import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProjectsHeroProps = {
  canCreate: boolean;
  search: string;
  setSearch: (value: string) => void;
};

export function ProjectsHero({
  canCreate,
}: ProjectsHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-linear-to-br from-zinc-950 via-zinc-950 to-emerald-950/25 p-6 shadow-2xl shadow-black/30 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_28%)]" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <Badge className="w-fit border-emerald-500/30 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/15">
            Project workspace
          </Badge>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Manage every project from one clean dashboard.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-zinc-300 md:text-base">
              View the full portfolio, keep the team aligned, and create or
              update project records without leaving the workspace.
            </p>
          </div>
        </div>
       
        {canCreate && (
          <Button
            asChild
            className="h-11 rounded-xl bg-emerald-500 px-5 text-zinc-950 hover:text-gray-200"
          >
            <Link href="/dashboard/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              New project
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
