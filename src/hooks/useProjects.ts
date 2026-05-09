"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { projectService } from "@/services/project.service";
import { Project } from "@/types";
import { ProjectFormValues } from "@/schemas/project.schema";

function getErrorMessage(error: unknown, fallback: string) {
    return (
        (error as { response?: { data?: { message?: string } } })?.response?.data
            ?.message || fallback
    );
}

export const useProjects = (autoLoad = true) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const loadProjects = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await projectService.list();
            setProjects(data);
            return data;
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to load projects"));
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getProject = useCallback(async (id: string) => {
        setIsLoading(true);
        try {
            return await projectService.getById(id);
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to load project"));
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createProject = useCallback(async (payload: ProjectFormValues) => {
        setIsSaving(true);
        try {
            const createdProject = await projectService.create(payload);
            setProjects((current) => [createdProject, ...current]);
            toast.success("Project created successfully");
            return createdProject;
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to create project"));
            throw error;
        } finally {
            setIsSaving(false);
        }
    }, []);

    const updateProject = useCallback(async (id: string, payload: ProjectFormValues) => {
        setIsSaving(true);
        try {
            const updatedProject = await projectService.update(id, payload);
            setProjects((current) =>
                current.map((project) =>
                    project.id === id ? updatedProject : project,
                ),
            );
            toast.success("Project updated successfully");
            return updatedProject;
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to update project"));
            throw error;
        } finally {
            setIsSaving(false);
        }
    }, []);

    const deleteProject = useCallback(async (id: string) => {
        setIsSaving(true);
        try {
            await projectService.remove(id);
            setProjects((current) => current.filter((project) => project.id !== id));
            toast.success("Project deleted successfully");
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to delete project"));
            throw error;
        } finally {
            setIsSaving(false);
        }
    }, []);

    useEffect(() => {
        if (autoLoad) {
            void loadProjects();
        }
    }, [autoLoad, loadProjects]);

    return {
        projects,
        isLoading,
        isSaving,
        loadProjects,
        getProject,
        createProject,
        updateProject,
        deleteProject,
    };
};