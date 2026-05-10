"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useProjects } from "@/hooks/useProjects";
import { ProjectForm } from "@/components/dashboard/projects/project-form";
import { Project } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default function EditProjectClient() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const projectId = params?.id;
  const { user } = useAuthStore();
  const { getProject, updateProject, isLoading, isSaving } = useProjects(false);
  const [project, setProject] = useState<Project | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const canManageProject =
    user?.role === "ADMIN" || (project ? project.creatorId === user?.id : true);

  useEffect(() => {
    const loadProject = async () => {
      if (!projectId) return;
      try {
        const response = await getProject(projectId);
        setProject(response);
      } catch (error) {
        setLoadError(
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Failed to load project",
        );
      }
    };

    void loadProject();
  }, [projectId]);

  if (isLoading) {
    return (
      <Card className="border-zinc-800 bg-zinc-900/80 shadow-2xl shadow-black/20">
        <CardContent className="p-8">
          <div className="h-6 w-40 rounded bg-zinc-800 animate-pulse" />
          <div className="mt-4 h-4 w-80 rounded bg-zinc-800 animate-pulse" />
          <div className="mt-8 space-y-4">
            <div className="h-11 rounded-xl bg-zinc-800 animate-pulse" />
            <div className="h-11 rounded-xl bg-zinc-800 animate-pulse" />
            <div className="h-32 rounded-xl bg-zinc-800 animate-pulse" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loadError || !project) {
    return (
      <Card className="mx-auto mt-10 max-w-2xl border-zinc-800 bg-zinc-900/80 text-zinc-100 shadow-2xl shadow-black/20">
        <CardContent className="p-8 text-center">
          <CardTitle className="text-2xl text-white">
            Project unavailable
          </CardTitle>
          <CardDescription className="mt-3 text-zinc-400">
            {loadError || "The project could not be found or loaded."}
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  if (!canManageProject) {
    return (
      <Card className="mx-auto mt-10 max-w-2xl border-zinc-800 bg-zinc-900/80 text-zinc-100 shadow-2xl shadow-black/20">
        <CardContent className="p-8 text-center">
          <CardTitle className="text-2xl text-white">
            Access restricted
          </CardTitle>
          <CardDescription className="mt-3 text-zinc-400">
            You can review this project, but only administrators or the project
            owner can update it.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <ProjectForm
      key={project.id}
      title="Edit project"
      description="Update the project scope, type, or description without leaving the dashboard."
      submitLabel="Save changes"
      backHref="/dashboard/projects"
      defaultValues={{
        name: project.name,
        type: project.type || "",
        description: project.description || "",
      }}
      isSubmitting={isSaving}
      onSubmit={async (values) => {
        await updateProject(project.id, {
          name: values.name,
          type: values.type,
          description: values.description?.trim() || undefined,
        });
        router.push("/dashboard/projects");
      }}
    />
  );
}
