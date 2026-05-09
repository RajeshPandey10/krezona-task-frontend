import { Suspense } from "react";
import { VerifyOtpForm } from "@/components/auth/verify-otp-form";

function VerifyOtpLoadingFallback() {
  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm shadow-2xl shadow-black/40">
      <div className="h-32 bg-zinc-800/50 rounded-lg animate-pulse" />
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-blue-600/8 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        <Suspense fallback={<VerifyOtpLoadingFallback />}>
          <VerifyOtpForm />
        </Suspense>
        <p className="text-center text-xs text-zinc-700 mt-5">
          Secure Subscription-Based Engineering Desktop Application
        </p>
      </div>
    </div>
  );
}
