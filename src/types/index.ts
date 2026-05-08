export type Role = 'ADMIN' | 'ENGINEER' | 'VIEWER';
export type SubscriptionPlan = 'FREE_TRIAL' | 'PROFESSIONAL' | 'ENTERPRISE';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: Role;
  subscription?: {
    plan: SubscriptionPlan;
    expiresAt: string;
    isActive: boolean;
  };
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  type?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
  creatorId: string;
  creator?: User;
  createdAt: string;
  updatedAt: string;
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