"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useProjects } from "@/hooks/useProjects";
import { ProjectForm } from "@/components/dashboard/projects/project-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ProjectFormValues } from "@/schemas/project.schema";

export default function NewProjectPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const initialized = useAuthStore((state) => state.initialized);
  const { createProject, isSaving } = useProjects(false);

  const canCreate = user?.role === "ADMIN" || user?.role === "ENGINEER";

  const handleCreate = async (values: ProjectFormValues) => {
    await createProject({
      name: values.name,
      type: values.type,
      description: values.description?.trim() || undefined,
    });
    router.push("/dashboard/projects");
  };

  if (!initialized) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner className="h-8 w-8 text-emerald-400" />
      </div>
    );
  }

  if (!canCreate) {
    return (
      <Card className="mx-auto mt-10 max-w-2xl border-zinc-800 bg-zinc-900/80 text-zinc-100 shadow-2xl shadow-black/20">
        <CardContent className="p-8 text-center">
          <CardTitle className="text-2xl text-white">
            View only access
          </CardTitle>
          <CardDescription className="mt-3 text-zinc-400">
            You can review projects, but your account cannot create new ones.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <ProjectForm
      title="Create project"
      description="Capture the project scope, engineering type, and coordination notes in one professional form."
      submitLabel="Create project"
      backHref="/dashboard/projects"
      isSubmitting={isSaving}
      onSubmit={handleCreate}
    />
  );
}
