"use client";

export function ProjectsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-64 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 animate-pulse"
        >
          <div className="h-4 w-2/3 rounded bg-zinc-800" />
          <div className="mt-4 h-5 w-1/3 rounded bg-zinc-800" />
          <div className="mt-6 space-y-3">
            <div className="h-3 rounded bg-zinc-800" />
            <div className="h-3 rounded bg-zinc-800" />
            <div className="h-3 w-5/6 rounded bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
