"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, FileText, Layers3, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProjectFormValues, projectSchema } from "@/schemas/project.schema";

type ProjectFormProps = {
  title: string;
  description: string;
  submitLabel: string;
  backHref: string;
  defaultValues?: Partial<ProjectFormValues>;
  isSubmitting?: boolean;
  onSubmit: (values: ProjectFormValues) => Promise<void> | void;
};

export function ProjectForm({
  title,
  description,
  submitLabel,
  backHref,
  defaultValues,
  isSubmitting = false,
  onSubmit,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      type: defaultValues?.type || "",
      description: defaultValues?.description || "",
    },
  });

  useEffect(() => {
    reset({
      name: defaultValues?.name || "",
      type: defaultValues?.type || "",
      description: defaultValues?.description || "",
    });
  }, [defaultValues, reset]);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_360px]">
      <Card className="border-zinc-800 bg-zinc-900/80 shadow-2xl shadow-black/30 backdrop-blur">
        <CardHeader className="space-y-5 border-b border-zinc-800/80 bg-zinc-950/40">
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              <Link href={backHref}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="space-y-1">
              <CardTitle className="text-2xl text-white">{title}</CardTitle>
              <CardDescription className="text-zinc-400">
                {description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form
            onSubmit={handleSubmit((values) => onSubmit(values))}
            className="space-y-5"
            noValidate
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Project name
                </Label>
                <Input
                  {...register("name")}
                  placeholder="Harbor Expansion Phase 2"
                  className="h-11 rounded-xl border-zinc-700/70 bg-zinc-950/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-emerald-500/60 focus-visible:ring-emerald-500/30"
                />
                {errors.name && (
                  <p className="text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Project type
                </Label>
                <Input
                  {...register("type")}
                  placeholder="Structural design"
                  className="h-11 rounded-xl border-zinc-700/70 bg-zinc-950/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-emerald-500/60 focus-visible:ring-emerald-500/30"
                />
                {errors.type && (
                  <p className="text-xs text-red-400">{errors.type.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                Description
              </Label>
              <Textarea
                {...register("description")}
                placeholder="Add scope, coordination notes, milestones, or any operational details."
                className="min-h-36 rounded-xl border-zinc-700/70 bg-zinc-950/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-emerald-500/60 focus-visible:ring-emerald-500/30"
              />
              {errors.description && (
                <p className="text-xs text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-zinc-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-zinc-500">
                Keep the project brief, specific, and ready for field execution.
              </p>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 rounded-xl bg-emerald-500 px-6 text-zinc-950 hover:bg-emerald-400"
              >
                {isSubmitting ? "Saving..." : submitLabel}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="border-zinc-800 bg-zinc-900/80 shadow-xl shadow-black/20">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Project standards
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Use consistent naming and structure across the workspace.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-zinc-300">
            <div className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-300">
                <Layers3 className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-white">Clear project identity</p>
                <p className="mt-1 text-zinc-400">
                  Use a descriptive name and a short type label that matches the
                  engineering scope.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <div className="rounded-lg bg-blue-500/10 p-2 text-blue-300">
                <Ruler className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-white">
                  Field-ready descriptions
                </p>
                <p className="mt-1 text-zinc-400">
                  Mention constraints, milestones, and any context the team
                  needs before starting work.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <div className="rounded-lg bg-amber-500/10 p-2 text-amber-300">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-white">Professional handoff</p>
                <p className="mt-1 text-zinc-400">
                  Keep every project entry ready for review, updates, and
                  accountability tracking.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
