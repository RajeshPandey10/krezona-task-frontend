"use client";

import { Search } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  const { user, logout } = useAuthStore();

  const getInitials = (
    email: string,
    firstName?: string,
    lastName?: string,
  ) => {
    if (firstName && lastName) {
      return (firstName[0] + lastName[0]).toUpperCase();
    }
    return email?.substring(0, 2).toUpperCase() || "U";
  };

  const getRoleLabel = (role: unknown) => {
    if (typeof role === "string") return role.toLowerCase();
    if (role && typeof role === "object" && "name" in role) {
      return String((role as { name?: unknown }).name || "").toLowerCase();
    }
    return "member";
  };

  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950 px-8 flex items-center justify-between">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative"></div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar className="h-8 w-8 border border-zinc-700">
                <AvatarFallback className="bg-emerald-600 text-white font-medium">
                  {getInitials(
                    user?.email || "",
                    user?.firstName,
                    user?.lastName,
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">
                  {user?.firstName || user?.email?.split("@")[0]}
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    </header>
  );
}
