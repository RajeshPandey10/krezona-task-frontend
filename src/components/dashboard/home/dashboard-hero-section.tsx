import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types";

type DashboardHeroSectionProps = {
  user: User;
  displayName: string;
  roleName: string;
};

function getInitials(firstName?: string, lastName?: string, email?: string) {
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }

  if (firstName) {
    return firstName.slice(0, 2).toUpperCase();
  }

  return email?.slice(0, 2).toUpperCase() || "U";
}

function getSubscriptionLabel(plan?: string) {
  if (!plan) return "Free trial";
  return plan.toLowerCase().replace(/_/g, " ");
}

function getSubscriptionStatusLabel(subscription?: {
  status?: string;
  isActive?: boolean;
}) {
  if (!subscription) return "No subscription";
  if (subscription.status) {
    return subscription.status.toLowerCase();
  }
  if (typeof subscription.isActive === "boolean") {
    return subscription.isActive ? "active" : "inactive";
  }
  return "unknown";
}

export function DashboardHeroSection({
  user,
  displayName,
  roleName,
}: DashboardHeroSectionProps) {
  const statusLabel = getSubscriptionStatusLabel(user.subscription);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-linear-to-br from-zinc-950 via-zinc-900 to-emerald-950/50 p-8 shadow-2xl shadow-black/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_30%)]" />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-5">
          <Badge className="w-fit border-emerald-500/30 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/15">
            {roleName.toLowerCase()} dashboard
          </Badge>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Welcome back, {displayName}.
            </h1>
            <p className="max-w-xl text-base leading-7 text-zinc-300 md:text-lg">
              {roleName === "ADMIN"
                ? "Manage users, subscriptions, and monitor system activity."
                : "Track projects, coordinate your team, and keep civil engineering work moving from one focused workspace."}
            </p>
          </div>
        
        </div>

        <Card className="w-full max-w-sm border-zinc-800 bg-zinc-950/80 backdrop-blur">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <Avatar className="h-14 w-14 border border-emerald-500/30">
              <AvatarFallback className="bg-emerald-500 text-lg font-semibold text-zinc-950">
                {getInitials(user.firstName, user.lastName, user.email)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <CardTitle className="truncate text-xl text-white">
                {displayName}
              </CardTitle>
              <p className="truncate text-sm text-zinc-400">{user.email}</p>
              <Badge className="mt-2 border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-900">
                {roleName.toLowerCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-zinc-300">
            <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
              <span>Active plan</span>
              <span className="font-medium text-white">
                {getSubscriptionLabel(user.subscription?.plan)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
              <span>Account status</span>
              <span
                className={`font-medium ${
                  statusLabel === "active"
                    ? "text-emerald-400"
                    : statusLabel === "expired" || statusLabel === "cancelled"
                      ? "text-amber-400"
                      : "text-zinc-400"
                }`}
              >
                {statusLabel}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
