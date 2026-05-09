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
import { SubscriptionCreateCardProps, User } from "@/types";
import { Plus } from "lucide-react";
import { getFullName } from "./subscription-utils";



export function SubscriptionCreateCard({
  usersWithoutSubscription,
  isLoading,
  selectedUserId,
  selectedPlan,
  isSaving,
  onUserSelect,
  onPlanChange,
  onCreate,
  onCancel,
}: SubscriptionCreateCardProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-900/80 shadow-2xl shadow-black/20">
      <CardHeader className="border-b border-zinc-800/80">
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-emerald-400" />
          Create Subscription ({usersWithoutSubscription.length})
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Add subscriptions for users who don't have one yet
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500" />
          </div>
        ) : usersWithoutSubscription.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-400">
              All users already have subscriptions!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-300">
                Select User
              </label>
              <Select value={selectedUserId || ""} onValueChange={onUserSelect}>
                <SelectTrigger className="h-10 border-zinc-700 bg-zinc-950/60 rounded-lg">
                  <SelectValue placeholder="Choose a user..." />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700">
                  {usersWithoutSubscription.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {getFullName(u)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedUserId && (
              <>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-zinc-300">
                    Plan
                  </label>
                  <Select value={selectedPlan} onValueChange={onPlanChange}>
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

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={onCreate}
                    disabled={isSaving}
                    className="h-10 rounded-lg bg-emerald-500 text-zinc-950 hover:bg-emerald-400"
                  >
                    {isSaving ? "Creating..." : "Create Subscription"}
                  </Button>
                  <Button
                    onClick={onCancel}
                    variant="outline"
                    className="h-10 rounded-lg border-zinc-700 hover:border-zinc-600"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
