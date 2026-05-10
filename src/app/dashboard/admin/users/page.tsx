"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import { adminService } from "@/services/admin.service";
import { AdminUser, RoleRecord, SubscriptionPlan } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ArrowRight } from "lucide-react";
import UsersStats from "@/components/dashboard/users/UsersStats";
import UsersTable from "@/components/dashboard/users/UsersTable";
import { UserDeleteDialog } from "@/components/dashboard/users/UserDeleteDialog";

function getFullName(user: AdminUser) {
  return (
    [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email
  );
}

export default function AdminUsersPage() {
  const router = useRouter();
  const { user, initialized } = useAuthStore();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newFirst, setNewFirst] = useState("");
  const [newLast, setNewLast] = useState("");
  const [newPass, setNewPass] = useState("");
  const [roles, setRoles] = useState<RoleRecord[]>([]);
  const [editingRoleUser, setEditingRoleUser] = useState<AdminUser | null>(
    null,
  );
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);

  useEffect(() => {
    if (!initialized) return;
    if (user?.role !== "ADMIN") {
      router.push("/dashboard");
      return;
    }

    const loadUsers = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const [userData, roleData] = await Promise.all([
          adminService.getUsers(),
          adminService.getRoles(),
        ]);
        setUsers(userData);
        setRoles(roleData);
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Failed to load users",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadUsers();
  }, [initialized, user, router]);

  useEffect(() => {
    if (!editingRoleUser) return;
    setSelectedRoleId(editingRoleUser.role?.id ?? "");
  }, [editingRoleUser]);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return users;
    return users.filter((item) =>
      [getFullName(item), item.email, item.role?.name, item.subscription?.plan]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query)),
    );
  }, [search, users]);

  const activeUsers = users.filter((item) => item.isActive).length;
  const verifiedUsers = users.filter((item) => item.isVerified).length;
  const subscribedUsers = users.filter((item) => item.subscription).length;

  const handleCreate = async () => {
    try {
      setIsSaving(true);
      setError(null);
      const created = await adminService.createUser({
        email: newEmail,
        password: newPass,
        firstName: newFirst || undefined,
        lastName: newLast || undefined,
      } as any);
      setUsers((s) => [created, ...s]);
      setCreating(false);
      setNewEmail("");
      setNewFirst("");
      setNewLast("");
      setNewPass("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const targetUser = users.find((u) => u.id === id);
    if (targetUser) {
      setDeleteTarget(targetUser);
    }
  };

  const handleEditRole = (targetUser: AdminUser) => {
    setEditingRoleUser(targetUser);
  };

  const handleSaveRole = async () => {
    if (!editingRoleUser || !selectedRoleId) return;

    try {
      setIsSaving(true);
      setError(null);
      const updated = await adminService.updateUserRole(editingRoleUser.id, {
        roleId: selectedRoleId,
      });
      setUsers((items) =>
        items.map((item) => (item.id === updated.id ? updated : item)),
      );
      toast.success(`Role updated for ${updated.email}`);
      setEditingRoleUser(null);
    } catch (saveError) {
      const errorMsg =
        saveError instanceof Error
          ? saveError.message
          : "Failed to update role";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      setError(null);
      await adminService.deleteUser(deleteTarget.id);
      setUsers((s) => s.filter((u) => u.id !== deleteTarget.id));
      toast.success(`User ${deleteTarget.email} deleted successfully`);
      setDeleteTarget(null);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to delete user";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!initialized || user?.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="space-y-8 text-zinc-100">
      <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-linear-to-br from-zinc-950 via-zinc-900 to-emerald-950/40 p-8 shadow-2xl shadow-black/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_30%)]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <Badge className="w-fit border-emerald-500/30 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/15">
              user management
            </Badge>
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                user management
              </h1>
              <p className="max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
                Review roles, activation state, verification status, and
                subscription coverage without jumping between pages.
              </p>
            </div>
          </div>

          <UsersStats
            total={users.length}
            active={activeUsers}
            subscribed={subscribedUsers}
          />
        </div>
      </section>

      <Card className="border-zinc-800 bg-zinc-950/70 shadow-lg shadow-black/10">
        <CardHeader className="space-y-4 border-b border-zinc-800/80">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-2xl text-white">
                Registered accounts
              </CardTitle>
              <p className="mt-1 text-sm text-zinc-400">
                Search by person, email, role, or plan.
              </p>
            </div>
            <div className="relative w-full lg:max-w-sm">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search users"
                className="h-11 rounded-2xl border-zinc-700/70 bg-zinc-950/60 pl-10 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-emerald-500/60 focus-visible:ring-emerald-500/30"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/dashboard/admin/users/create">
                <Button className="rounded-full bg-emerald-500 text-zinc-950 hover:bg-emerald-200">
                  + New user
                </Button>
              </Link>
              <div className="text-sm text-zinc-400">{users.length} users</div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-zinc-400">
              Loading users...
            </div>
          ) : error ? (
            <div className="p-6">
              <div className="rounded-3xl border border-red-900/50 bg-red-950/20 p-6 text-red-200">
                {error}
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-zinc-400">
              No users match the current search.
            </div>
          ) : (
            <UsersTable
              users={filteredUsers}
              onDelete={handleDelete}
              onEditRole={handleEditRole}
            />
          )}
        </CardContent>
      </Card>

      {editingRoleUser ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setEditingRoleUser(null)}
          />
          <div className="relative w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl shadow-black/40">
            <div className="space-y-2">
              <CardTitle className="text-2xl text-white">Change role</CardTitle>
              <p className="text-sm text-zinc-400">
                {getFullName(editingRoleUser)}
              </p>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-zinc-300">Role</label>
                <Select
                  value={selectedRoleId}
                  onValueChange={setSelectedRoleId}
                >
                  <SelectTrigger className="mt-2 h-11 w-full rounded-2xl border-zinc-700/70 bg-zinc-950/60 text-zinc-100">
                    <SelectValue placeholder="Choose role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleSaveRole}
                  disabled={isSaving || !selectedRoleId}
                  className="rounded-full bg-emerald-500 text-zinc-950 hover:bg-emerald-400"
                >
                  {isSaving ? "Saving..." : "Save role"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditingRoleUser(null)}
                  className="rounded-full border-zinc-700 bg-zinc-950/40 text-zinc-100 hover:bg-zinc-200"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <UserDeleteDialog
        deleteTarget={deleteTarget}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
