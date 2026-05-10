"use client";

export function getRoleColor(roleName?: string) {
    switch (roleName?.toUpperCase()) {
        case "ADMIN":
            return "bg-red-500/10 text-red-300 border-red-500/30";
        case "ENGINEER":
            return "bg-blue-500/10 text-blue-300 border-blue-500/30";
        case "VIEWER":
            return "bg-amber-500/10 text-amber-300 border-amber-500/30";
        default:
            return "bg-zinc-500/10 text-zinc-300 border-zinc-500/30";
    }
}

export function formatDate(dateString?: string) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}
