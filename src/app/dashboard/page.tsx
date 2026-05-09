"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import {
  ArrowRight,
  Clock,
  FolderOpen,
  PieChart,
  Plus,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Total Projects",
    value: "24",
    description: "+4 this week",
    icon: FolderOpen,
  },
  {
    title: "Active Projects",
    value: "18",
    description: "75% of pipeline",
    icon: TrendingUp,
  },
  {
    title: "Team Members",
    value: "12",
    description: "3 new invites pending",
    icon: Users,
  },
  {
    title: "This Month",
    value: "7",
    description: "Deliverables completed",
    icon: Clock,
  },
];

const recentProjects = [
  {
    name: "Metro Bridge Survey",
    status: "In Progress",
    progress: "82%",
    tone: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  {
    name: "Highway Drainage Review",
    status: "Awaiting Review",
    progress: "56%",
    tone: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  {
    name: "Residential Site Layout",
    status: "On Track",
    progress: "91%",
    tone: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  },
];

function getInitials(firstName?: string, lastName?: string, email?: string) {
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }

  if (firstName) {
    return firstName.slice(0, 2).toUpperCase();
  }

  return email?.slice(0, 2).toUpperCase() || "U";
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.email?.split("@")[0] ||
    "Engineer";

  return (
    <div className="space-y-8 text-zinc-100">
      <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-linear-to-br from-zinc-950 via-zinc-900 to-emerald-950/50 p-8 shadow-2xl shadow-black/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_30%)]" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-5">
            <Badge className="w-fit border-emerald-500/30 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/15">
              Dashboard overview
            </Badge>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Welcome back, {displayName}.
              </h1>
              <p className="max-w-xl text-base leading-7 text-zinc-300 md:text-lg">
                Track projects, coordinate your team, and keep civil engineering
                work moving from one focused workspace.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="gap-2 rounded-full bg-emerald-500 px-5 text-zinc-950 hover:bg-emerald-400">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
              <Button
                variant="outline"
                className="gap-2 rounded-full border-zinc-700 bg-zinc-950/50 text-zinc-100 hover:bg-zinc-900"
              >
                <Settings className="h-4 w-4" />
                Workspace Settings
              </Button>
            </div>
          </div>

          <Card className="w-full max-w-sm border-zinc-800 bg-zinc-950/80 backdrop-blur">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <Avatar className="h-14 w-14 border border-emerald-500/30">
                <AvatarFallback className="bg-emerald-500 text-lg font-semibold text-zinc-950">
                  {getInitials(user?.firstName, user?.lastName, user?.email)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <CardTitle className="truncate text-xl text-white">
                  {displayName}
                </CardTitle>
                <p className="truncate text-sm text-zinc-400">{user?.email}</p>
                <Badge className="mt-2 border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-900">
                  {user?.role ? user.role.toLowerCase() : "member"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-zinc-300">
              <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
                <span>Active plan</span>
                <span className="font-medium text-white">
                  {user?.subscription?.plan?.toLowerCase().replace("_", " ") ||
                    "Free trial"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
                <span>Projects monitored</span>
                <span className="font-medium text-white">24</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, value, description, icon: Icon }) => (
          <Card
            key={title}
            className="border-zinc-800 bg-zinc-950/70 shadow-lg shadow-black/10 transition-transform duration-200 hover:-translate-y-1 hover:border-emerald-500/30"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">
                {title}
              </CardTitle>
              <Icon className="h-5 w-5 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold tracking-tight text-white">
                {value}
              </p>
              <p className="mt-2 text-sm text-zinc-500">{description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <Card className="border-zinc-800 bg-zinc-950/70">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-xl text-white">
                Recent projects
              </CardTitle>
              <p className="mt-1 text-sm text-zinc-400">
                A quick look at what needs attention today.
              </p>
            </div>
            <PieChart className="h-5 w-5 text-zinc-500" />
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project) => (
              <div
                key={project.name}
                className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4"
              >
                <div>
                  <p className="font-medium text-white">{project.name}</p>
                  <Badge
                    className={`mt-2 border ${project.tone} hover:bg-transparent`}
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-500">Progress</p>
                  <p className="text-lg font-semibold text-white">
                    {project.progress}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950/70">
          <CardHeader>
            <CardTitle className="text-xl text-white">Quick actions</CardTitle>
            <p className="text-sm text-zinc-400">
              Jump into common tasks without digging through menus.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Create a new project",
              "Invite a team member",
              "Review subscription",
              "Open activity logs",
            ].map((label) => (
              <button
                key={label}
                type="button"
                className="flex w-full items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 px-4 py-3 text-left text-sm text-zinc-200 transition hover:border-emerald-500/30 hover:bg-zinc-900"
              >
                <span>{label}</span>
                <ArrowRight className="h-4 w-4 text-zinc-500" />
              </button>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
