"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterForm } from "@/schemas/auth.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      await signUp({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
      setSuccess(true);
      setTimeout(
        () =>
          router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`),
        900,
      );
    } catch (err) {
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
              <p className="text-lg font-bold text-zinc-100">
                Account created!
              </p>
              <p className="text-sm text-zinc-500">
                Check your email for the OTP to verify your account.
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
                  Create account
                </h1>
                <p className="text-sm text-zinc-500 mt-1">
                  Register to start using your workspace
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                    First name
                  </Label>
                  <Input
                    {...register("firstName")}
                    className="bg-zinc-800/60 border-zinc-700/60 text-zinc-100 placeholder:text-zinc-600 h-11 rounded-xl"
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-400">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                    Last name
                  </Label>
                  <Input
                    {...register("lastName")}
                    className="bg-zinc-800/60 border-zinc-700/60 text-zinc-100 placeholder:text-zinc-600 h-11 rounded-xl"
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-400">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                    Email
                  </Label>
                  <Input
                    {...register("email")}
                    type="email"
                    autoComplete="email"
                    className="bg-zinc-800/60 border-zinc-700/60 text-zinc-100 placeholder:text-zinc-600 h-11 rounded-xl"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                    Password
                  </Label>
                  <Input
                    {...register("password")}
                    type="password"
                    autoComplete="new-password"
                    className="bg-zinc-800/60 border-zinc-700/60 text-zinc-100 placeholder:text-zinc-600 h-11 rounded-xl"
                  />
                  {errors.password && (
                    <p className="text-xs text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                    Confirm password
                  </Label>
                  <Input
                    {...register("confirmPassword")}
                    type="password"
                    className="bg-zinc-800/60 border-zinc-700/60 text-zinc-100 placeholder:text-zinc-600 h-11 rounded-xl"
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-400">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-xl mt-2 bg-linear-to-r from-violet-600 to-blue-600 text-white font-semibold shadow-lg transition-all duration-200 border-0"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4 mr-2" />
                      Creating…
                    </>
                  ) : (
                    "Create account"
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
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-violet-400 hover:text-violet-300 font-medium"
                >
                  Login
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
