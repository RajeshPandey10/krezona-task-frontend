'use client';
import { useAuthStore } from "@/store/auth.store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { navigation } from "@/constants/navigation.contant";

export function Sidebar() {
    const pathname = usePathname();
    const {user,logout,hasRole} = useAuthStore()
    return (
    <div className="w-72 border-r border-zinc-800 bg-zinc-950 flex flex-col h-screen">
      {/* Logo */}
      <div className="px-8 py-8 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">K</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Krezona</h1>
            <p className="text-[10px] text-zinc-500 -mt-1">CIVIL ENGINEERING</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          if (!hasRole(item.roles)) return null;

          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-zinc-800 mt-auto">
        <div className="bg-zinc-900 rounded-2xl p-4 mb-4">
          <p className="text-xs text-zinc-400">Logged in as</p>
          <p className="font-medium text-sm mt-0.5">{user?.email}</p>
          <p className="text-emerald-500 text-xs capitalize mt-1">{user?.role.toLowerCase()}</p>
        </div>

        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start text-red-400 hover:text-red-500 hover:bg-red-950/50"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}