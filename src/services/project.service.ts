import api from "@/lib/axios";
import { Project, Role } from "@/types";
import { ProjectFormValues } from "@/schemas/project.schema";

type ProjectApiResponse = Omit<Project, "creator"> & {
    creator?: {
        id: string;
        email: string;
        firstName?: string | null;
        lastName?: string | null;
        role?: Role | { name?: string } | string;
    };
};

function normalizeRole(role: unknown): Role {
    if (role === "ADMIN" || role === "ENGINEER" || role === "VIEWER") {
        return role;
    }

    if (role && typeof role === "object" && "name" in role) {
        const name = (role as { name?: unknown }).name;
        if (name === "ADMIN" || name === "ENGINEER" || name === "VIEWER") {
            return name;
        }
    }

    return "ENGINEER";
}

function normalizeProject(project: ProjectApiResponse): Project {
    return {
        ...project,
        creator: project.creator
            ? {
                ...project.creator,
                firstName: project.creator.firstName ?? undefined,
                lastName: project.creator.lastName ?? undefined,
                role: normalizeRole(project.creator.role),
            }
            : undefined,
    };
}

function normalizeProjectsResponse(data: unknown): Project[] {
    if (Array.isArray(data)) {
        return data.map((project) => normalizeProject(project as ProjectApiResponse));
    }

    if (Array.isArray((data as { data?: unknown })?.data)) {
        return ((data as { data: unknown[] }).data || []).map((project) =>
            normalizeProject(project as ProjectApiResponse),
        );
    }

    if (Array.isArray((data as { projects?: unknown })?.projects)) {
        return ((data as { projects: unknown[] }).projects || []).map((project) =>
            normalizeProject(project as ProjectApiResponse),
        );
    }

    return [];
}

export const projectService = {
    list: async () => {
        const { data } = await api.get("/projects");
        return normalizeProjectsResponse(data);
    },

    getById: async (id: string) => {
        const { data } = await api.get(`/projects/${id}`);
        return normalizeProject(data as ProjectApiResponse);
    },

    create: async (payload: ProjectFormValues) => {
        const { data } = await api.post("/projects", payload);
        return normalizeProject(data as ProjectApiResponse);
    },

    update: async (id: string, payload: ProjectFormValues) => {
        const { data } = await api.patch(`/projects/${id}`, payload);
        return normalizeProject(data as ProjectApiResponse);
    },

    remove: async (id: string) => {
        const { data } = await api.delete(`/projects/${id}`);
        return data;
    },
};