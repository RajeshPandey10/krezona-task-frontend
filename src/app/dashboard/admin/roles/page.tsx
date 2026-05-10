"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import { useRoles } from "@/hooks/useRoles";
import { RoleRecord } from "@/types";
import { RolesListCard } from "@/components/dashboard/roles/RolesListCard";
import { RoleEditDialog } from "@/components/dashboard/roles/RoleEditDialog";
import { RoleDeleteDialog } from "@/components/dashboard/roles/RoleDeleteDialog";
import { RoleCreateDialog } from "@/components/dashboard/roles/RoleCreateDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EditingRole {
  id: string;
  name: string;
  description?: string;
}

export default function AdminRolesPage() {
  const router = useRouter();
  const { user, initialized } = useAuthStore();
  const { roles, isLoading, fetchAll, create, update, remove } = useRoles();

  const [editing, setEditing] = useState<EditingRole | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<RoleRecord | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDescription, setNewRoleDescription] = useState("");

  useEffect(() => {
    if (!initialized) return;
    if (user?.role !== "ADMIN") {
      router.push("/dashboard");
      return;
    }
    fetchAll();
  }, [initialized, user, router, fetchAll]);

  if (!initialized || user?.role !== "ADMIN") {
    return null;
  }

  if (isLoading && roles.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-500" />
      </div>
    );
  }

  const handleEditClick = (role: RoleRecord) => {
    setEditing({
      id: role.id,
      name: role.name,
      description: role.description || undefined,
    });
  };

  const handleSave = async () => {
    if (!editing) return;
    try {
      setIsSaving(true);
      await update(editing.id, {
        name: editing.name,
        description: editing.description,
      });
      setEditing(null);
      toast.success("Role updated successfully");
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to update role";
      toast.error(errorMsg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove(deleteTarget.id);
      setDeleteTarget(null);
      toast.success("Role deleted successfully");
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to delete role";
      toast.error(errorMsg);
    }
  };

  const handleCreate = async () => {
    try {
      setIsSaving(true);
      await create({
        name: newRoleName,
        description: newRoleDescription || undefined,
      });
      setIsCreating(false);
      setNewRoleName("");
      setNewRoleDescription("");
      toast.success("Role created successfully");
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to create role";
      toast.error(errorMsg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Role Management</h1>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Role
        </Button>
      </div>

      <RolesListCard
        roles={roles}
        onEdit={handleEditClick}
        onDelete={(role) => setDeleteTarget(role)}
      />

      <RoleEditDialog
        editing={editing}
        isSaving={isSaving}
        onNameChange={(name) =>
          setEditing(editing ? { ...editing, name } : null)
        }
        onDescriptionChange={(description) =>
          setEditing(editing ? { ...editing, description } : null)
        }
        onSave={handleSave}
        onCancel={() => setEditing(null)}
      />

      <RoleDeleteDialog
        deleteTarget={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <RoleCreateDialog
        isOpen={isCreating}
        isSaving={isSaving}
        name={newRoleName}
        description={newRoleDescription}
        onNameChange={setNewRoleName}
        onDescriptionChange={setNewRoleDescription}
        onCreate={handleCreate}
        onCancel={() => {
          setIsCreating(false);
          setNewRoleName("");
          setNewRoleDescription("");
        }}
      />
    </div>
  );
}
