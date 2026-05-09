export function DashboardLoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950">
      <div className="space-y-4 text-center">
        <div className="inline-block">
          <div className="h-8 w-8 rounded-full border-4 border-zinc-700 border-t-emerald-500 animate-spin" />
        </div>
        <p className="text-zinc-400">Loading your dashboard...</p>
      </div>
    </div>
  );
}
