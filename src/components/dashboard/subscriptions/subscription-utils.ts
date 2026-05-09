import { User } from "@/types";

export function getStatusColor(status: string) {
    switch (status) {
        case "ACTIVE":
            return "bg-emerald-500/10 text-emerald-300 border-emerald-500/30";
        case "EXPIRED":
            return "bg-red-500/10 text-red-300 border-red-500/30";
        case "CANCELLED":
            return "bg-gray-500/10 text-gray-300 border-gray-500/30";
        default:
            return "bg-zinc-500/10 text-zinc-300";
    }
}

export function getPlanColor(plan: string) {
    switch (plan) {
        case "PROFESSIONAL":
            return "bg-purple-500/10 text-purple-300 border-purple-500/30";
        case "ENTERPRISE":
            return "bg-blue-500/10 text-blue-300 border-blue-500/30";
        case "FREE_TRIAL":
            return "bg-amber-500/10 text-amber-300 border-amber-500/30";
        default:
            return "bg-zinc-500/10 text-zinc-300";
    }
}

export function formatDate(dateString?: string) {
    if (!dateString) return "No expiry";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
}

export function getFullName(user: { firstName?: string | null; lastName?: string | null; email?: string }) {
    const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
    return name || user.email || "Unknown";
}
