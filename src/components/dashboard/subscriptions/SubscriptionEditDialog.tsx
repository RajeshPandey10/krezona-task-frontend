"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubscriptionResponse } from "@/services/subscription.service";
import { getFullName } from "./subscription-utils";

interface EditingSubscription {
  userId: string;
  plan: string;
  status: string;
  expiresAt?: string;
}

interface SubscriptionEditDialogProps {
  editing: EditingSubscription | null;
  subscriptions: SubscriptionResponse[];
  isSaving: boolean;
  onPlanChange: (plan: string) => void;
  onStatusChange: (status: string) => void;
  onExpiryChange: (date: string | undefined) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function SubscriptionEditDialog({
  editing,
  subscriptions,
  isSaving,
  onPlanChange,
  onStatusChange,
  onExpiryChange,
  onSave,
  onCancel,
}: SubscriptionEditDialogProps) {
  if (!editing) return null;

  const subscription = subscriptions.find((s) => s.userId === editing.userId);

  return (
    <Card className="border-zinc-800 bg-zinc-900/80 shadow-2xl shadow-black/20">
      <CardHeader className="border-b border-zinc-800/80">
        <CardTitle>Edit Subscription</CardTitle>
        <CardDescription>
          Editing subscription for {getFullName(subscription?.user || {})}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-zinc-300">Plan</label>
          <Select value={editing.plan} onValueChange={onPlanChange}>
            <SelectTrigger className="h-10 border-zinc-700 bg-zinc-950/60 rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700">
              <SelectItem value="FREE_TRIAL">Free Trial</SelectItem>
              <SelectItem value="PROFESSIONAL">Professional</SelectItem>
              <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-zinc-300">Status</label>
          <Select value={editing.status} onValueChange={onStatusChange}>
            <SelectTrigger className="h-10 border-zinc-700 bg-zinc-950/60 rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700">
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="EXPIRED">Expired</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-zinc-300">
            Expiry Date (Optional)
          </label>
          <input
            type="date"
            value={editing.expiresAt?.split("T")[0] || ""}
            onChange={(e) =>
              onExpiryChange(
                e.target.value
                  ? new Date(e.target.value).toISOString()
                  : undefined,
              )
            }
            className="h-10 w-full rounded-lg border border-zinc-700 bg-zinc-950/60 px-3 text-zinc-100 placeholder:text-zinc-600"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={onSave}
            disabled={isSaving}
            className="h-10 rounded-lg bg-emerald-500 text-zinc-950 hover:bg-emerald-400"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="h-10 rounded-lg border-zinc-700 hover:border-zinc-600"
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
