"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminService } from "@/services/admin.service";
import { subscriptionService } from "@/services/subscription.service";
import { AdminUser } from "@/types";
import { getFullName } from "@/components/dashboard/subscriptions/subscription-utils";

export default function AdminCreateSubscriptionModal() {
  const router = useRouter();
  const [allUsers, setAllUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [plan, setPlan] = useState<string>("FREE_TRIAL");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const users = await adminService.getUsers();
      setAllUsers(users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const usersWithout = allUsers.filter((u) => u.subscription == null);

  const handleCreate = async () => {
    if (!selectedUserId) return;
    try {
      setIsSaving(true);
      await subscriptionService.adminCreateForUser(selectedUserId, {
        plan: plan as any,
        status: "ACTIVE",
      });
      router.push("/dashboard/admin/subscriptions");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => router.back()}
      />
      <div className="relative max-w-md w-full mx-4">
        <Card className="bg-white/5 border border-zinc-800">
          <CardHeader>
            <CardTitle>Create Subscription</CardTitle>
            <CardDescription>
              Add a subscription for a user (admin)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-8 text-center">Loading users...</div>
            ) : usersWithout.length === 0 ? (
              <div className="py-8 text-center">
                All users already have subscriptions
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-zinc-300">Select User</label>
                  <Select
                    value={selectedUserId || ""}
                    onValueChange={(v) => setSelectedUserId(v)}
                  >
                    <SelectTrigger className="h-10 mt-2 rounded-lg border border-zinc-700 bg-zinc-950/60">
                      <SelectValue placeholder="Choose a user..." />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700">
                      {usersWithout.map((u) => (
                        <SelectItem key={u.id} value={u.id}>
                          {getFullName(u)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-zinc-300">Plan</label>
                  <Select value={plan} onValueChange={(v) => setPlan(v)}>
                    <SelectTrigger className="h-10 mt-2 rounded-lg border border-zinc-700 bg-zinc-950/60">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700">
                      <SelectItem value="FREE_TRIAL">Free Trial</SelectItem>
                      <SelectItem value="PROFESSIONAL">Professional</SelectItem>
                      <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleCreate}
                    disabled={isSaving || !selectedUserId}
                    className="bg-emerald-500"
                  >
                    {isSaving ? "Creating..." : "Create Subscription"}
                  </Button>
                  <Button variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
