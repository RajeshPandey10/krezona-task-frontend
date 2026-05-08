import { Role } from "@/types";
import { Clock, CreditCard, FolderOpen, LayoutDashboard, Users } from "lucide-react";

export const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['ADMIN', 'ENGINEER', 'VIEWER'] as Role[],
  },
  {
    name: 'Projects',
    href: '/dashboard/projects',
    icon: FolderOpen,
    roles: ['ADMIN', 'ENGINEER', 'VIEWER'] as Role[],
  },
  {
    name: 'Subscription',
    href: '/dashboard/subscription',
    icon: CreditCard,
    roles: ['ADMIN', 'ENGINEER', 'VIEWER'] as Role[],
  },
  {
    name: 'Users',
    href: '/dashboard/admin/users',
    icon: Users,
    roles: ['ADMIN'] as Role[],
  },
  {
    name: 'Logs',
    href: '/dashboard/admin/logs',
    icon: Clock,
    roles: ['ADMIN'] as Role[],
  },
];