import { Clock, CreditCard, FolderOpen, LayoutDashboard, Users } from "lucide-react";

export const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'ENGINEER', 'VIEWER'] },
  { label: 'Projects', href: '/dashboard/projects', icon: FolderOpen, roles: ['ADMIN', 'ENGINEER', 'VIEWER'] },
  { label: 'Subscription', href: '/dashboard/subscription', icon: CreditCard, roles: ['ADMIN', 'ENGINEER', 'VIEWER'] },
  { label: 'Users', href: '/dashboard/admin/users', icon: Users, roles: ['ADMIN'] },
  { label: 'Logs', href: '/dashboard/admin/logs', icon: Clock, roles: ['ADMIN'] },
];