"use client";

import { useEffect, useState } from "react";
import { useDashboardAuth } from "@/hooks/useDashboardAuth";
import { adminService } from "@/services/admin.service";
import { AdminDashboardStats } from "@/types";
import { DashboardHeroSection } from "@/components/dashboard/home/dashboard-hero-section";
import { DashboardLoadingScreen } from "@/components/dashboard/home/dashboard-loading-screen";
import { DashboardRestrictedAccess } from "@/components/dashboard/home/dashboard-restricted-access";
import { DashboardAdminSection } from "@/components/dashboard/home/dashboard-admin-section";
import DashboardEngineerSection from "../../components/dashboard/home/dashboard-engineer-section";

function getRoleName(role: unknown) {
  if (typeof role === "string") return role;
  if (role && typeof role === "object" && "name" in role) {
    return String((role as { name?: unknown }).name || "ENGINEER");
  }
  return "ENGINEER";
}

export default function DashboardPage() {
  const { user, isLoading, hasRole } = useDashboardAuth();
  const [adminStats, setAdminStats] = useState<AdminDashboardStats | null>(
    null,
  );
  const [adminStatsLoading, setAdminStatsLoading] = useState(false);

  const isAdmin = !!user && hasRole(["ADMIN"]);

  useEffect(() => {
    if (!isAdmin) {
      setAdminStats(null);
      setAdminStatsLoading(false);
      return;
    }

    let active = true;
    setAdminStatsLoading(true);

    adminService
      .dashboard()
      .then((data) => {
        if (active) {
          setAdminStats(data);
        }
      })
      .catch(() => {
        if (active) {
          setAdminStats(null);
        }
      })
      .finally(() => {
        if (active) {
          setAdminStatsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [isAdmin]);

  if (isLoading) {
    return <DashboardLoadingScreen />;
  }

  if (!user) {
    return null;
  }

  // Check if user has access to dashboard (ADMIN, ENGINEER)
  const hasAccess = hasRole(["ADMIN", "ENGINEER"]);

  if (!hasAccess) {
    return <DashboardRestrictedAccess />;
  }

  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.email?.split("@")[0] ||
    "Engineer";
  const roleName = getRoleName(user.role);

  return (
    <div className="space-y-8 text-zinc-100">
      <DashboardHeroSection
        user={user}
        displayName={displayName}
        roleName={roleName}
      />

      {roleName === "ENGINEER" && <DashboardEngineerSection />}

      {roleName === "ADMIN" && (
        <DashboardAdminSection
          adminStats={adminStats}
          adminStatsLoading={adminStatsLoading}
        />
      )}
    </div>
  );
}
