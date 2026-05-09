"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import { adminService } from "@/services/admin.service";
import { SubscriptionResponse } from "@/services/subscription.service";
import { User } from "@/types";
import { SubscriptionsListCard } from "@/components/dashboard/subscriptions/SubscriptionsListCard";
import { SubscriptionEditDialog } from "@/components/dashboard/subscriptions/SubscriptionEditDialog";
import { SubscriptionDeleteDialog } from "@/components/dashboard/subscriptions/SubscriptionDeleteDialog";
import { Button } from "@/components/ui/button";


interface EditingSubscription {
  userId: string;
  plan: string;
  status: string;
  expiresAt?: string;
}

export default function AdminSubscriptionsPage() {
  const router = useRouter();
  const { user, initialized } = useAuthStore();
  const {
    subscriptions,
    isLoading,
    fetchAll,
    updateForUser,
    createForUser,
    remove,
  } = useSubscriptions(true);

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [editing, setEditing] = useState<EditingSubscription | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SubscriptionResponse | null>(
    null,
  );
  const [creating, setCreating] = useState<{
    userId: string;
    plan: string;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!initialized) return;
    if (user?.role !== "ADMIN") {
      router.push("/dashboard");
      return;
    }
    fetchAll();
    loadUsers();
  }, [initialized, user, router, fetchAll]);

  const loadUsers = async () => {
    try {
      setUsersLoading(true);
      const users = await adminService.getUsers();
      setAllUsers(users);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setUsersLoading(false);
    }
  };

  if (!initialized || user?.role !== "ADMIN") {
    return null;
  }

  if (isLoading && subscriptions.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
      </div>
    );
  }

  const handleSave = async () => {
    if (!editing) return;
    try {
      setIsSaving(true);
      await updateForUser(editing.userId, {
        plan: editing.plan as any,
        status: editing.status as any,
        expiresAt: editing.expiresAt,
      });
      setEditing(null);
    } catch (error) {
      console.error("Failed to update subscription:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove(deleteTarget.userId);
      setDeleteTarget(null);
    } catch (error) {
      console.error("Failed to delete subscription:", error);
    }
  };

  const handleCreate = async () => {
    if (!creating) return;
    try {
      setIsSaving(true);
      await createForUser(creating.userId, {
        plan: creating.plan as any,
        status: "ACTIVE",
      });
      setCreating(null);
      loadUsers();
    } catch (error) {
      console.error("Failed to create subscription:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const usersWithoutSubscription = allUsers.filter(
    (u) => !subscriptions.find((s) => s.userId === u.id),
  );

  return (
    <div className="space-y-6 text-zinc-100">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Subscription Manager
            </h1>
            <p className="text-zinc-400 mt-2">
              Manage user subscriptions and plans
            </p>
          </div>
          <div>
            <Button
              onClick={() =>
                router.push("/dashboard/admin/subscriptions/create")
              }
              className="h-10"
            >
              Add Subscription
            </Button>
          </div>
        </div>
      </div>

      <SubscriptionsListCard
        subscriptions={subscriptions}
        onEdit={(sub) =>
          setEditing({
            userId: sub.userId,
            plan: sub.plan,
            status: sub.status,
            expiresAt: sub.expiresAt,
          })
        }
        onDelete={setDeleteTarget}
      />

      {/* Create now handled in modal route: /dashboard/admin/subscriptions/create */}

      <SubscriptionEditDialog
        editing={editing}
        subscriptions={subscriptions}
        isSaving={isSaving}
        onPlanChange={(plan) => editing && setEditing({ ...editing, plan })}
        onStatusChange={(status) =>
          editing && setEditing({ ...editing, status })
        }
        onExpiryChange={(expiresAt) =>
          editing && setEditing({ ...editing, expiresAt })
        }
        onSave={handleSave}
        onCancel={() => setEditing(null)}
      />

      <SubscriptionDeleteDialog
        deleteTarget={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
