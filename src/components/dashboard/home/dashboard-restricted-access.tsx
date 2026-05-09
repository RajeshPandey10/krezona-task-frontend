import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

export function DashboardRestrictedAccess() {
  return (
    <div className="space-y-8 text-zinc-100">
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md border-zinc-800 bg-zinc-950/70">
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-amber-500/15 p-4">
                <Lock className="h-8 w-8 text-amber-400" />
              </div>
            </div>
            <CardTitle className="text-2xl text-white">
              Access Restricted
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-zinc-400">
            <p>Your current role does not have access to the dashboard.</p>
            <p className="mt-2 text-sm">Please contact your administrator.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
