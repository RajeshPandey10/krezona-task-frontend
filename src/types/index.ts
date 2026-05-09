export type Role = 'ADMIN' | 'ENGINEER' | 'VIEWER';
export type SubscriptionPlan = 'FREE_TRIAL' | 'PROFESSIONAL' | 'ENTERPRISE';

export interface RoleRecord {
  id: string;
  name: Role;
  description?: string | null;
}

export interface SubscriptionRecord {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
  expiresAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  role: RoleRecord;
  subscription?: SubscriptionRecord | null;
}

export interface LoginLogEntry {
  id: string;
  userId?: string | null;
  email?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  success: boolean;
  createdAt: string;
  user?: {
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
  } | null;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: Role;
  subscription?: {
    plan: SubscriptionPlan;
    expiresAt?: string;
    status?: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
    isActive?: boolean;
  };
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  type?: string;
  status?: 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
  creatorId: string;
  creator?: User;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormValues {
  name: string;
  type: string;
  description?: string;
}

export interface AdminDashboardStats {
  users: number;
  projects: number;
  subscriptions: number;
  logs: number;
  failedLogs: number;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

//for state management
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
  hasRole: (roles: Role[]) => boolean;
}