"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Pencil, Trash2 } from "lucide-react";
import { AdminUser, SubscriptionPlan } from "@/types";

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

export default function UsersTable({
  users,
  onDelete,
  onEditRole,
}: {
  users: AdminUser[];
  onDelete: (id: string) => void;
  onEditRole: (user: AdminUser) => void;
}) {
  if (!users.length) {
    return (
      <div className="p-8 text-center text-zinc-400">No users to show.</div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-b-3xl border-t border-zinc-800 [scrollbar-color:rgb(82_82_91)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-600/70">
      <div className="min-w-[1080px]">
        <div className="grid grid-cols-12 gap-4 border-b border-zinc-800 bg-zinc-900/80 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          <div className="col-span-4">User</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Account</div>
          <div className="col-span-2">Subscription</div>
          <div className="col-span-2">Actions</div>
        </div>

        <div className="divide-y divide-zinc-800">
          {users.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 text-sm text-zinc-300"
            >
              <div className="col-span-4 space-y-1">
                <p className="font-medium text-white">{getFullName(item)}</p>
                <p className="text-xs text-zinc-500">{item.email}</p>
              </div>
              <div className="col-span-2">
                <Badge className="border-emerald-500/30 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/15">
                  {item.role?.name}
                </Badge>
              </div>
              <div className="col-span-2 space-y-2">
                <Badge
                  variant="outline"
                  className={
                    item.isActive
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-red-500/30 bg-red-500/10 text-red-300"
                  }
                >
                  {getStatusLabel(item)}
                </Badge>
                <p className="text-xs text-zinc-500">
                  {item.isVerified ? "Verified" : "Not verified"}
                </p>
              </div>
              <div className="col-span-2">
                <Badge
                  variant="outline"
                  className={
                    item.subscription
                      ? "border-blue-500/30 bg-blue-500/10 text-blue-300"
                      : "border-zinc-700 bg-zinc-900 text-zinc-400"
                  }
                >
                  {getPlanLabel(item.subscription?.plan)}
                </Badge>
              </div>
              <div className="col-span-2 flex items-start gap-2 whitespace-nowrap">
                <Button
                  onClick={() => onEditRole(item)}
                  variant="outline"
                  className="rounded-full border-zinc-700 bg-zinc-950/40 text-zinc-100 hover:bg-zinc-200"
                >
                  Role <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-zinc-700 bg-zinc-950/40 text-zinc-100 hover:bg-zinc-200"
                >
                  <Link href="/dashboard/admin/subscriptions">
                    Manage <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  onClick={() => onDelete(item.id)}
                  variant="ghost"
                  className="p-2 text-red-400"
                  aria-label={`Delete ${item.email}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
