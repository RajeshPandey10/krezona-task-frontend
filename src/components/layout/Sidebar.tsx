"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { navItems } from "@/constants/navItems.contant";

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout, hasRole } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("sidebar-collapsed");
    setCollapsed(saved === "true");
  }, []);

  const toggleSidebar = () => {
    setCollapsed((current) => {
      const nextValue = !current;
      window.localStorage.setItem("sidebar-collapsed", String(nextValue));
      return nextValue;
    });
  };

  return (
    <div
      className={`relative flex flex-col border-r border-zinc-800 bg-zinc-950 transition-all duration-200 ${collapsed ? "w-20" : "w-64"}`}
    >
      <button
        type="button"
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 flex h-6 w-6 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950 text-zinc-300 shadow-lg shadow-black/20 transition hover:border-emerald-500 hover:text-white"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>

      <div className={`border-b border-zinc-800 ${collapsed ? "p-4" : "p-6"}`}>
        <h1
          className={`font-bold text-emerald-500 ${collapsed ? "text-lg text-center" : "text-2xl"}`}
        >
          {collapsed ? "K" : "Krezona"}
        </h1>
        {!collapsed && (
          <p className="text-xs text-zinc-500">Civil Engineering</p>
        )}
      </div>

      <nav className={`flex-1 space-y-1 ${collapsed ? "p-3" : "p-4"}`}>
        {navItems.map((item) => {
          if (!hasRole(item.roles as any)) return null;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center rounded-xl py-3 transition-all ${collapsed ? "justify-center px-3" : "gap-3 px-4"} ${isActive ? "bg-emerald-600 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"}`}
            >
              <item.icon className="w-5 h-5" />
              {!collapsed && item.label}
            </Link>
          );
        })}
      </nav>

      <div className={`border-t border-zinc-800 ${collapsed ? "p-3" : "p-4"}`}>
        <button
          onClick={logout}
          title={collapsed ? "Logout" : undefined}
          className={`flex w-full items-center rounded-xl py-3 text-red-400 transition-all hover:bg-zinc-900 ${collapsed ? "justify-center px-3" : "gap-3 px-4"}`}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );
}
