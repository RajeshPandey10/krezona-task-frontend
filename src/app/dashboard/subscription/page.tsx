"use client";

import Link from "next/link";
import { useDashboardAuth } from "@/hooks/useDashboardAuth";
import { SubscriptionStatus } from "@/components/dashboard/subscription-status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  CalendarDays,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { User } from "@/types";
import { DashboardLoadingScreen } from "@/components/dashboard/home/dashboard-loading-screen";

function getFullName(user: User) {
  return (
    [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email
  );
}

function getPlanLabel(plan?: string) {
  if (!plan) return "No plan";
  return plan.replace(/_/g, " ").toLowerCase();
}

function getStatusLabel(status?: string) {
  if (!status) return "Unknown";
  return status.toLowerCase();
}

export default function SubscriptionPage() {
  const { user, isLoading, initialized } = useDashboardAuth();

  if (!initialized || isLoading) {
    return <DashboardLoadingScreen />;
  }

  if (!user) {
    return null;
  }

  const subscription = user.subscription;
  const fullName = getFullName(user);
  const hasSubscription = Boolean(subscription);

  return (
    <div className="space-y-8 text-zinc-100">
      <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-linear-to-br from-zinc-950 via-zinc-900 to-emerald-950/40 p-8 shadow-2xl shadow-black/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_30%)]" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <Badge className="w-fit border-emerald-500/30 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/15">
              your subscription
            </Badge>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Stay on top of your plan, {fullName}.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
                View your current access level, billing window, and account
                status in one clean place. If you need a change, your
                administrator can update the subscription for you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-full bg-emerald-500 px-5 text-zinc-950 hover:bg-emerald-400"
              >
                <Link href="/dashboard/projects">
                  <ArrowRight className="h-4 w-4" />
                  Go to projects
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-zinc-700 bg-zinc-950/50 text-zinc-100 hover:bg-zinc-900"
              >
                <Link href="/dashboard">
                  <ShieldCheck className="h-4 w-4" />
                  Back to dashboard
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:max-w-lg lg:grid-cols-3">
            {[
              {
                label: "Role",
                value: user.role,
                icon: UserRound,
              },
              {
                label: "Plan",
                value: getPlanLabel(subscription?.plan),
                icon: Sparkles,
              },
              {
                label: "Status",
                value: getStatusLabel(
                  subscription?.status || (hasSubscription ? "ACTIVE" : "NONE"),
                ),
                icon: CalendarDays,
              },
            ].map(({ label, value, icon: Icon }) => (
              <Card
                key={label}
                className="border-zinc-800 bg-zinc-950/75 backdrop-blur"
              >
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div>
          <SubscriptionStatus userId={user.id} />
        </div>

        <div className="space-y-6">
          <Card className="border-zinc-800 bg-zinc-950/70 shadow-lg shadow-black/10">
            <CardHeader>
              <CardTitle className="text-white">
                What this plan controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-zinc-300">
              <div className="flex items-start gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                <Sparkles className="mt-0.5 h-4 w-4 text-emerald-400" />
                <p>
                  Feature access, account availability, and how long your
                  current plan stays active.
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                <CalendarDays className="mt-0.5 h-4 w-4 text-blue-400" />
                <p>
                  The expiry date is tracked here when a limited plan is
                  assigned by the administrator.
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-amber-400" />
                <p>
                  Active subscriptions keep the dashboard and project workspace
                  flowing without interruption.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-950/70 shadow-lg shadow-black/10">
            <CardHeader>
              <CardTitle className="text-white">Need an upgrade?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-zinc-300">
              <p>
                If you need a different plan, contact an administrator with the
                email linked to your account.
              </p>
              <Button
                asChild
                className="w-full rounded-2xl bg-emerald-500 text-zinc-950 hover:bg-emerald-400"
              >
                <Link href="/dashboard/admin/users">
                  Open admin users
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
