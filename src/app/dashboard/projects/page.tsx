"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useProjects } from "@/hooks/useProjects";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Project } from "@/types";
import { ProjectsHero } from "@/components/dashboard/projects/ProjectsHero";
import { ProjectsOverview } from "@/components/dashboard/projects/ProjectsOverview";
import { ProjectCard } from "@/components/dashboard/projects/ProjectCard";
import { ProjectsEmptyState } from "@/components/dashboard/projects/ProjectsEmptyState";
import { ProjectsSkeleton } from "@/components/dashboard/projects/ProjectsSkeleton";
import { ProjectDeleteDialog } from "@/components/dashboard/projects/ProjectDeleteDialog";

function getProjectOwner(project: Project) {
  const creator = project.creator;
  if (!creator) return "Unassigned";
  return (
    [creator.firstName, creator.lastName].filter(Boolean).join(" ") ||
    creator.email
  );
}

export default function ProjectsPage() {
  const { user } = useAuthStore();
  const { projects, isLoading, deleteProject } = useProjects();
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  const canCreate = user?.role === "ADMIN" || user?.role === "ENGINEER";
  const filteredProjects = projects.filter((project) => {
    const query = search.trim().toLowerCase();
    if (!query) return true;
    return [
      project.name,
      project.type,
      project.description,
      project.creator?.email,
      getProjectOwner(project),
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query));
  });

  const mineCount = projects.filter(
    (project) => project.creatorId === user?.id,
  ).length;
  const projectTypes = new Set(
    projects.map((project) => project.type).filter(Boolean),
  );

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteProject(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6 text-zinc-100">
      <ProjectsHero
        canCreate={canCreate}
        search={search}
        setSearch={setSearch}
      />

      <ProjectsOverview
        total={projects.length}
        mineCount={mineCount}
        typesCount={projectTypes.size}
      />

      <Card className="border-zinc-800 bg-zinc-900/80 shadow-2xl shadow-black/20">
        <CardHeader className="space-y-4 border-b border-zinc-800/80">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-2xl text-white">
                Project registry
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Search, review, and manage the current project portfolio.
              </CardDescription>
            </div>
            <div className="relative w-full lg:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by project, type, owner, or description"
                className="h-11 rounded-xl border-zinc-700/70 bg-zinc-950/60 pl-10 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-emerald-500/60 focus-visible:ring-emerald-500/30"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading ? (
            <ProjectsSkeleton />
          ) : filteredProjects.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => {
                const canManage =
                  user?.role === "ADMIN" || project.creatorId === user?.id;
                return (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    canManage={canManage}
                    onDelete={setDeleteTarget}
                  />
                );
              })}
            </div>
          ) : (
            <ProjectsEmptyState search={search} canCreate={canCreate} />
          )}
        </CardContent>
      </Card>

      <ProjectDeleteDialog
        isOpen={Boolean(deleteTarget)}
        project={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
