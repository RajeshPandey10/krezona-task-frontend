"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginForm } from "@/schemas";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1200);
    } catch (err) {
      // Error already handled in hook
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-blue-600/8 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm shadow-2xl shadow-black/40">
          {success ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>
              <p className="text-lg font-bold text-zinc-100">Signed in!</p>
              <p className="text-sm text-zinc-500">
                Redirecting to your dashboard…
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-black to-gray-400 flex items-center justify-center shrink-0">
                    <Image
                      src="/vercel.svg"
                      alt="Krezona logo"
                      width={16}
                      height={16}
                      style={{ width: "auto", height: "auto" }}
                      className="dark:invert"
                    />
                  </div>
                  <span className="text-lg font-bold text-white tracking-tight">
                    Krezona
                  </span>
                </div>

                <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">
                  Welcome back
                </h1>
                <p className="text-sm text-zinc-500 mt-1">
                  Sign in to continue to your workspace
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                    Email
                  </Label>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="bg-zinc-800/60 border-zinc-700/60 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-violet-500/40 focus-visible:border-violet-500/60 h-11 rounded-xl"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                      Password
                    </Label>
                  </div>
                  <Input
                    {...register("password")}
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="bg-zinc-800/60 border-zinc-700/60 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-violet-500/40 focus-visible:border-violet-500/60 h-11 rounded-xl"
                  />
                  {errors.password && (
                    <p className="text-xs text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-xl mt-2 bg-linear-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold shadow-lg shadow-violet-900/30 transition-all duration-200 border-0"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4 mr-2" />
                      Signing in…
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-800" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-zinc-900 px-3 text-xs text-zinc-600">
                    or
                  </span>
                </div>
              </div>

              <p className="text-center text-sm text-zinc-600">
                Don&apos;t have an account?{" "}
                <a
                  href="/register"
                  className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
                >
                  Register
                </a>
              </p>
            </>
          )}
        </div>

        <p className="text-center text-xs text-zinc-700 mt-5">
          Secure Subscription-Based Engineering Desktop Application
        </p>
      </div>
    </div>
  );
}
