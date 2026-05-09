import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, LayoutGrid } from "lucide-react";
import { SubscriptionStatus } from "@/components/dashboard/subscription-status";
import { EngineerLoginLogs } from "@/components/dashboard/home/EngineerLoginLogs";
import { useAuthStore } from "@/store/auth.store";

export function DashboardEngineerSection() {
  const { user } = useAuthStore();

  return (
    <section className="grid gap-6">
      <div className="flex items-center justify-end">
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-3 rounded-xl bg-emerald-500 px-4 py-2 text-zinc-950 hover:bg-emerald-400"
        >
          <FolderOpen className="h-4 w-4" />
          View projects
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {user?.id && (
          <div className="md:col-span-1">
            <SubscriptionStatus userId={user.id} />
          </div>
        )}

        <Card className="border-zinc-800 bg-zinc-900/80 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg text-white">My projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-400">
              Open the projects list to manage assignment and updates.
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/80">
          <CardHeader>
            <CardTitle className="text-lg text-white">Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-400">
              Browse the company project portfolio and find references.
            </p>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <EngineerLoginLogs />
        </div>
      </div>
    </section>
  );
}

export default DashboardEngineerSection;
