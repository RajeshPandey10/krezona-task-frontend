import { ArrowRight, Clock, FolderOpen, PieChart, TrendingUp, Users } from "lucide-react";
import { AdminDashboardStats } from "@/types";

export function getAdminCards(adminStats: AdminDashboardStats | null | undefined) {
    return [
        {
            title: "Users",
            value: adminStats?.users ?? 0,
            description: "Registered accounts",
            icon: Users,
        },
        {
            title: "Projects",
            value: adminStats?.projects ?? 0,
            description: "Tracked projects",
            icon: FolderOpen,
        },
        {
            title: "Subscriptions",
            value: adminStats?.subscriptions ?? 0,
            description: "Active subscriptions",
            icon: TrendingUp,
        },
        {
            title: "Logs",
            value: adminStats?.logs ?? 0,
            description: "Total login logs",
            icon: Clock,
        },
        {
            title: "Failed Logs",
            value: adminStats?.failedLogs ?? 0,
            description: "Failed login attempts",
            icon: PieChart,
        },
    ];
}

//  export const cards = [
//     {
//       title: "Users",
//       value: adminStats?.users ?? 0,
//       description: "Registered accounts",
//       icon: Users,
//     },
//     {
//       title: "Projects",
//       value: adminStats?.projects ?? 0,
//       description: "Tracked projects",
//       icon: FolderOpen,
//     },
//     {
//       title: "Subscriptions",
//       value: adminStats?.subscriptions ?? 0,
//       description: "Active subscriptions",
//       icon: TrendingUp,
//     },
//     {
//       title: "Logs",
//       value: adminStats?.logs ?? 0,
//       description: "Total login logs",
//       icon: Clock,
//     },
//     {
//       title: "Failed Logs",
//       value: adminStats?.failedLogs ?? 0,
//       description: "Failed login attempts",
//       icon: PieChart,
//     },
//   ];