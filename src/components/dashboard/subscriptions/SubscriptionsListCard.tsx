"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubscriptionResponse } from "@/services/subscription.service";
import { Zap, AlertTriangle, CheckCircle } from "lucide-react";
import {
  getStatusColor,
  getPlanColor,
  formatDate,
  getFullName,
} from "./subscription-utils";

interface SubscriptionsListCardProps {
  subscriptions: SubscriptionResponse[];
  onEdit: (sub: SubscriptionResponse) => void;
  onDelete: (sub: SubscriptionResponse) => void;
}

export function SubscriptionsListCard({
  subscriptions,
  onEdit,
  onDelete,
}: SubscriptionsListCardProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-900/80 shadow-2xl shadow-black/20">
      <CardHeader className="border-b border-zinc-800/80">
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-emerald-400" />
          Active Subscriptions ({subscriptions.length})
        </CardTitle>
        <CardDescription className="text-zinc-400">
          View and manage all user subscriptions
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {subscriptions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-400">No subscriptions found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="flex items-center justify-between gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="font-semibold text-white">
                        {getFullName(sub.user)}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {sub.user.email}
                      </span>
                    </div>
                    <Badge
                      className={`border ${getPlanColor(sub.plan)}`}
                      variant="outline"
                    >
                      {sub.plan}
                    </Badge>
                    <Badge
                      className={`border ${getStatusColor(sub.status)}`}
                      variant="outline"
                    >
                      {sub.status === "ACTIVE" ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 mr-1" />
                      )}
                      {sub.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-zinc-500">
                    Expires: {formatDate(sub.expiresAt)} • ID: {sub.userId}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(sub)}
                    className="h-9 border-zinc-700 hover:border-emerald-500/40"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(sub)}
                    className="h-9 border-red-500/20 bg-red-500/10 text-red-300 hover:border-red-500/30 hover:bg-red-500/20"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
