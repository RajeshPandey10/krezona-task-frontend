"use client";

import { useCallback, useState } from "react";
import { adminService } from "@/services/admin.service";
import { RoleRecord } from "@/types";

export interface CreateRoleRequest {
    name: string;
    description?: string;
}

export interface UpdateRoleRequest {
    name?: string;
    description?: string;
}

export function useRoles() {
    const [roles, setRoles] = useState<RoleRecord[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAll = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await adminService.getRoles();
            setRoles(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to fetch roles";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const create = useCallback(async (createData: CreateRoleRequest) => {
        try {
            setIsLoading(true);
            setError(null);
            const created = await adminService.createRole(createData);
            setRoles((prev) => [...prev, created]);
            return created;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to create role";
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const update = useCallback(async (id: string, updateData: UpdateRoleRequest) => {
        try {
            setIsLoading(true);
            setError(null);
            const updated = await adminService.updateRole(id, updateData);
            setRoles((prev) => prev.map((role) => (role.id === id ? updated : role)));
            return updated;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to update role";
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const remove = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            setError(null);
            await adminService.deleteRole(id);
            setRoles((prev) => prev.filter((role) => role.id !== id));
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to delete role";
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        roles,
        isLoading,
        error,
        fetchAll,
        create,
        update,
        remove,
    };
}
