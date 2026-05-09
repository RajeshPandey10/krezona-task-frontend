import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";

type ProjectsOverviewProps = {
  total: number;
  mineCount: number;
  typesCount: number;
};

export function ProjectsOverview({
  total,
  mineCount,
  typesCount,
}: ProjectsOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-zinc-800 bg-zinc-900/80 shadow-xl shadow-black/20">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-zinc-400">Total projects</p>
            <p className="mt-2 text-3xl font-semibold text-white">{total}</p>
          </div>
          <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-300">
            <FolderOpen className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-900/80 shadow-xl shadow-black/20">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-zinc-400">My projects</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {mineCount}
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-300">
            <svg className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-900/80 shadow-xl shadow-black/20">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-zinc-400">Project types</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {typesCount}
            </p>
          </div>
          <div className="rounded-2xl bg-violet-500/10 p-3 text-violet-300">
            <svg className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
