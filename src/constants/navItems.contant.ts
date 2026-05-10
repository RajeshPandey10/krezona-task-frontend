import { Clock, CreditCard, FolderOpen, LayoutDashboard, Users, Shield } from "lucide-react";

export const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'ENGINEER', 'VIEWER'] },
    { label: 'Projects', href: '/dashboard/projects', icon: FolderOpen, roles: ['ADMIN', 'ENGINEER', 'VIEWER'] },
    { label: 'Users', href: '/dashboard/admin/users', icon: Users, roles: ['ADMIN'] },
    { label: 'Roles', href: '/dashboard/admin/roles', icon: Shield, roles: ['ADMIN'] },
    { label: 'Subscriptions', href: '/dashboard/admin/subscriptions', icon: CreditCard, roles: ['ADMIN'] },
    { label: 'Logs', href: '/dashboard/admin/logs', icon: Clock, roles: ['ADMIN'] },
];