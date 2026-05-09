"use client";

import { useEffect, useState } from "react";
import {
  subscriptionService,
  SubscriptionResponse,
} from "@/services/subscription.service";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface SubscriptionStatusProps {
  userId: string;
}

function getStatusIcon(subscription?: SubscriptionResponse | null) {
  if (!subscription) return null;
  switch (subscription.status) {
    case "ACTIVE":
      return <CheckCircle className="h-5 w-5 text-emerald-400" />;
    case "EXPIRED":
      return <AlertTriangle className="h-5 w-5 text-red-400" />;
    case "CANCELLED":
      return <Clock className="h-5 w-5 text-gray-400" />;
    default:
      return <Zap className="h-5 w-5 text-zinc-400" />;
  }
}

function getDaysRemaining(expiresAt?: string) {
  if (!expiresAt) return null;
  const now = new Date();
  const expiry = new Date(expiresAt);
  const daysLeft = Math.ceil(
    (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  return daysLeft > 0 ? daysLeft : null;
}

export function SubscriptionStatus({ userId }: SubscriptionStatusProps) {
  const [subscription, setSubscription] = useState<SubscriptionResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const data = await subscriptionService.getByUserId(userId);
        setSubscription(data);
      } catch (error) {
        console.error("Failed to fetch subscription:", error);
        setSubscription(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, [userId]);

  if (isLoading) {
    return (
      <Card className="border-zinc-800 bg-zinc-900/80">
        <CardContent className="flex items-center justify-center p-6">
          <div className="animate-pulse text-zinc-400">
            Loading subscription...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!subscription) {
    return (
      <Card className="border-zinc-800 bg-zinc-900/80">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-zinc-400">No active subscription</p>
            <p className="text-sm text-zinc-500 mt-1">
              Contact admin to upgrade
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const daysRemaining = getDaysRemaining(subscription.expiresAt);
  const isExpired =
    subscription.status !== "ACTIVE" || (daysRemaining && daysRemaining <= 0);

  return (
    <Card
      className={`border-zinc-800 ${isExpired ? "bg-red-950/20" : "bg-zinc-900/80"}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg">Subscription</CardTitle>
        {getStatusIcon(subscription)}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-zinc-400">Plan</p>
            <Badge
              variant="outline"
              className={
                subscription.plan === "PROFESSIONAL"
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                  : subscription.plan === "ENTERPRISE"
                    ? "bg-blue-500/10 text-blue-300 border-blue-500/30"
                    : "bg-amber-500/10 text-amber-300 border-amber-500/30"
              }
            >
              {subscription.plan.replace("_", " ")}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-zinc-400">Status</p>
            <Badge
              variant="outline"
              className={
                subscription.status === "ACTIVE"
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                  : "bg-red-500/10 text-red-300 border-red-500/30"
              }
            >
              {subscription.status}
            </Badge>
          </div>
        </div>

        {subscription.expiresAt && (
          <div className="pt-3 border-t border-zinc-800">
            <p className="text-sm text-zinc-400">Expires</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-zinc-200">
                {new Date(subscription.expiresAt).toLocaleDateString()}
              </span>
              {daysRemaining && daysRemaining > 0 && (
                <span
                  className={`text-xs font-semibold ${
                    daysRemaining <= 7 ? "text-red-400" : "text-emerald-400"
                  }`}
                >
                  {daysRemaining} days left
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
