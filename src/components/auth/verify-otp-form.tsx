"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";
import {
  otpVerificationSchema,
  type OtpVerificationForm,
} from "@/schemas/auth.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export function VerifyOtpForm() {
  const { verifyOtp, signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultEmail = searchParams?.get("email") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpVerificationForm>({
    resolver: zodResolver(otpVerificationSchema),
  });

  useEffect(() => {
    const pending = sessionStorage.getItem("pending_password");
    if (!pending && !defaultEmail) {
      router.push("/register");
    }
  }, [defaultEmail, router]);

  const onSubmit = async (data: OtpVerificationForm) => {
    setIsLoading(true);
    try {
      await verifyOtp(data.email, data.otp);
      setSuccess(true);
      const pendingPassword = sessionStorage.getItem("pending_password") || "";
      if (pendingPassword) {
        await signIn(data.email, pendingPassword);
        sessionStorage.removeItem("pending_password");
      }
      setTimeout(() => router.push("/dashboard"), 900);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm shadow-2xl shadow-black/40">
      {success ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-emerald-400" />
          </div>
          <p className="text-lg font-bold text-zinc-100">Verified!</p>
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
              Verify OTP
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Enter the code sent to your email
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
                defaultValue={defaultEmail}
                type="email"
                autoComplete="email"
                className="bg-zinc-800/60 border-zinc-700/60 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-violet-500/40 focus-visible:border-violet-500/60 h-11 rounded-xl"
              />
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                OTP
              </Label>
              <Input
                {...register("otp")}
                placeholder="6-digit code"
                inputMode="numeric"
                autoComplete="one-time-code"
                className="bg-zinc-800/60 border-zinc-700/60 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-violet-500/40 focus-visible:border-violet-500/60 h-11 rounded-xl"
              />
              {errors.otp && (
                <p className="text-xs text-red-400">{errors.otp.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl mt-2 bg-linear-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold shadow-lg shadow-violet-900/30 transition-all duration-200 border-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-zinc-900 px-3 text-xs text-zinc-600">or</span>
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
  );
}
