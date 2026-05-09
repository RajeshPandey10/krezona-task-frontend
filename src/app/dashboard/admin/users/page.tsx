"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { adminService } from "@/services/admin.service";
import { AdminUser, SubscriptionPlan } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import UsersStats from "@/components/dashboard/users/UsersStats";
import UsersTable from "@/components/dashboard/users/UsersTable";

function getFullName(user: AdminUser) {
  return (
    [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email
  );
}

function getPlanLabel(plan?: SubscriptionPlan) {
  if (!plan) return "No subscription";
  return plan.replace(/_/g, " ").toLowerCase();
}

function getStatusLabel(user: AdminUser) {
  if (!user.isVerified) return "Unverified";
  if (!user.isActive) return "Inactive";
  return "Active";
}

export default function AdminUsersPage() {
  const router = useRouter();
  const { user, initialized } = useAuthStore();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newFirst, setNewFirst] = useState("");
  const [newLast, setNewLast] = useState("");
  const [newPass, setNewPass] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

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
        const data = await adminService.getUsers();
        setUsers(data);
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
    if (!confirm("Delete this user? This action cannot be undone.")) return;
    try {
      setError(null);
      await adminService.deleteUser(id);
      setUsers((s) => s.filter((u) => u.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
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
                <Button className="rounded-full bg-emerald-500 text-zinc-950 hover:bg-emerald-400">
                  New user
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
            <UsersTable users={filteredUsers} onDelete={handleDelete} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
