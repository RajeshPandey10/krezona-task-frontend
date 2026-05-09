"use client";

import Link from "next/link";
import { Pencil, ArrowRight, Trash2 } from "lucide-react";
import { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProjectCardProps {
  project: Project;
  canManage: boolean;
  onDelete: (project: Project) => void;
}

function formatDate(value?: string) {
  if (!value) return "Recently";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function getProjectOwner(project: Project) {
  const creator = project.creator;
  if (!creator) return "Unassigned";
  return (
    [creator.firstName, creator.lastName].filter(Boolean).join(" ") ||
    creator.email
  );
}

export function ProjectCard({
  project,
  canManage,
  onDelete,
}: ProjectCardProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-950/70 shadow-lg shadow-black/20 transition-transform duration-200 hover:-translate-y-1 hover:border-emerald-500/30">
      <CardHeader className="space-y-3 border-b border-zinc-800/80">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <CardTitle className="text-xl text-white">{project.name}</CardTitle>
            <CardDescription className="text-zinc-400">
              {project.description || "No description provided yet."}
            </CardDescription>
          </div>
          <Badge className="border-emerald-500/30 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/15">
            {project.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-5">
        <div className="grid gap-3 text-sm text-zinc-400">
          <div className="flex items-center justify-between gap-4">
            <span>Owner</span>
            <span className="text-zinc-200">{getProjectOwner(project)}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>Created</span>
            <span className="text-zinc-200">
              {formatDate(project.createdAt)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>Updated</span>
            <span className="text-zinc-200">
              {formatDate(project.updatedAt)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {canManage && (
            <Button
              asChild
              variant="outline"
              className="h-10 rounded-xl border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-emerald-500/40 hover:bg-zinc-800"
            >
              <Link href={`/dashboard/projects/${project.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
          )}
          {canManage && (
            <Button
              variant="outline"
              onClick={() => onDelete(project)}
              className="h-10 rounded-xl border-red-500/20 bg-red-500/10 text-red-300 hover:border-red-500/30 hover:bg-red-500/20 hover:text-red-200"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          )}
          <Button
            asChild
            variant="ghost"
            className="h-10 rounded-xl text-zinc-300 hover:bg-zinc-900 hover:text-white"
          >
            <Link href={`/dashboard/projects/${project.id}/edit`}>
              <ArrowRight className="mr-2 h-4 w-4" />
              Open
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
