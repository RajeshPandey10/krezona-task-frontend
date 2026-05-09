'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

export const useDashboardAuth = () => {
    const { user, isLoading, initialized } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (initialized && !user) {
            router.push('/login');
        }
    }, [user, initialized, router]);

    return {
        user,
        isLoading,
        initialized,
        hasRole: (roles: string[]) => user ? roles.includes(user.role) : false,
    };
};
