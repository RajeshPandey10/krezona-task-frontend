"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { adminService } from "@/services/admin.service";

export default function AdminCreateUserModal() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleCreate = async () => {
    try {
      setIsSaving(true);
      await adminService.createUser({
        email,
        password,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
      } as any);
      router.push("/dashboard/admin/users");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => router.back()}
      />
      <div className="relative max-w-md w-full mx-4">
        <Card className="bg-white/5 border border-zinc-800">
          <CardHeader>
            <CardTitle>Create User</CardTitle>
            <CardDescription>Add a user to the system (admin)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-300">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950/60 p-2 text-zinc-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="rounded-lg border border-zinc-700 bg-zinc-950/60 p-2 text-zinc-100"
                />
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="rounded-lg border border-zinc-700 bg-zinc-950/60 p-2 text-zinc-100"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-300">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950/60 p-2 text-zinc-100"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleCreate}
                  disabled={isSaving}
                  className="bg-emerald-500"
                >
                  {isSaving ? "Creating..." : "Create User"}
                </Button>
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
