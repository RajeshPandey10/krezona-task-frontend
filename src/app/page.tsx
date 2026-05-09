"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function Home() {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <p className="text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-32">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">Krezona</h1>
            <p className="text-xl text-zinc-400">
              Civil Engineering Project Management Platform
            </p>
          </div>

          <p className="max-w-2xl mx-auto text-lg text-zinc-300">
            Streamline your civil engineering projects with professional
            collaboration tools, real-time tracking, and comprehensive
            reporting.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href="/login"
              className="px-8 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="px-8 py-3 rounded-lg border border-zinc-700 text-white font-medium hover:bg-zinc-900 transition"
            >
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
