import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { AdminDashboardStats } from "@/types";
import { getAdminCards } from "@/constants/adminCard.contant";

type DashboardAdminSectionProps = {
  adminStats: AdminDashboardStats | null;
  adminStatsLoading: boolean;
};

export function DashboardAdminSection({
  adminStats,
  adminStatsLoading,
}: DashboardAdminSectionProps) {
  const cards = getAdminCards(adminStats);

  return (
    <>
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
        {cards.map(({ title, value, description, icon: Icon }) => (
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
                {adminStatsLoading ? "..." : value}
              </p>
              <p className="mt-2 text-sm text-zinc-500">{description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border-zinc-800 bg-zinc-950/70">
          <CardHeader>
            <CardTitle className="text-xl text-white">System Stats</CardTitle>
            <p className="mt-1 text-sm text-zinc-400">
              Overview of system metrics
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Total Users</span>
              <span className="font-semibold text-white">
                {adminStatsLoading ? "..." : (adminStats?.users ?? 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Active Projects</span>
              <span className="font-semibold text-white">
                {adminStatsLoading ? "..." : (adminStats?.projects ?? 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">System Health</span>
              <Badge className="border-emerald-500/30 bg-emerald-500/15 text-emerald-300">
                {adminStatsLoading
                  ? "Loading"
                  : (adminStats?.failedLogs ?? 0) > 0
                    ? "Attention"
                    : "Healthy"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950/70">
          <CardHeader>
            <CardTitle className="text-xl text-white">Admin Actions</CardTitle>
            <p className="mt-1 text-sm text-zinc-400">
              Common admin tasks and shortcuts
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "View all users",
              "Manage subscriptions",
              "View system logs",
              "System settings",
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
    </>
  );
}

export default DashboardAdminSection;
