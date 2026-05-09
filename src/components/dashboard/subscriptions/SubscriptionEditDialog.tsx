"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const subscription = subscriptions.find((s) => s.userId === editing?.userId);

  return (
    <Dialog
      open={Boolean(editing)}
      onOpenChange={(open) => !open && onCancel()}
    >
      <DialogContent
        showCloseButton={false}
        className="border border-zinc-700/50 bg-linear-to-b from-zinc-900 to-zinc-950 shadow-xl"
      >
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold text-white">
            Edit Subscription
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-400">
            Editing subscription for{" "}
            <span className="font-semibold text-zinc-300">
              {getFullName(subscription?.user || {})}
            </span>
          </DialogDescription>
        </DialogHeader>

        {editing && (
          <div className="space-y-5 py-6">
            <div className="space-y-2.5">
              <label className="block text-sm font-semibold text-white">
                Plan
              </label>
              <Select value={editing.plan} onValueChange={onPlanChange}>
                <SelectTrigger className="h-11 cursor-pointer rounded-lg border border-zinc-600 bg-zinc-950/80 text-white shadow-sm transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20">
                  <SelectValue className="text-white" />
                </SelectTrigger>
                <SelectContent className="border border-zinc-600 bg-zinc-900 shadow-lg">
                  <SelectItem value="FREE_TRIAL" className="cursor-pointer">
                    Free Trial
                  </SelectItem>
                  <SelectItem value="PROFESSIONAL" className="cursor-pointer">
                    Professional
                  </SelectItem>
                  <SelectItem value="ENTERPRISE" className="cursor-pointer">
                    Enterprise
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2.5">
              <label className="block text-sm font-semibold text-white">
                Status
              </label>
              <Select value={editing.status} onValueChange={onStatusChange}>
                <SelectTrigger className="h-11 cursor-pointer rounded-lg border border-zinc-600 bg-zinc-950/80 text-white shadow-sm transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20">
                  <SelectValue className="text-white" />
                </SelectTrigger>
                <SelectContent className="border border-zinc-600 bg-zinc-900 shadow-lg">
                  <SelectItem value="ACTIVE" className="cursor-pointer">
                    Active
                  </SelectItem>
                  <SelectItem value="EXPIRED" className="cursor-pointer">
                    Expired
                  </SelectItem>
                  <SelectItem value="CANCELLED" className="cursor-pointer">
                    Cancelled
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2.5">
              <label className="block text-sm font-semibold text-white">
                Expiry Date{" "}
                <span className="text-xs text-zinc-500">(Optional)</span>
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
                className="h-11 w-full cursor-pointer rounded-lg border border-zinc-600 bg-zinc-950/80 px-4 text-white transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
              />
            </div>
          </div>
        )}

        <DialogFooter className="flex gap-3 pt-2">
          <Button
            onClick={onCancel}
            variant="outline"
            className="h-10 cursor-pointer rounded-lg border border-zinc-600 bg-zinc-950/50 text-zinc-300 transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            disabled={isSaving}
            className="h-10 cursor-pointer rounded-lg bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg transition-all duration-200 hover:from-emerald-400 hover:to-emerald-500 hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
