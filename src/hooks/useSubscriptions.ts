"use client";

import { useState, useCallback } from "react";
import { subscriptionService, SubscriptionResponse, UpdateSubscriptionRequest } from "@/services/subscription.service";

export function useSubscriptions(isAdmin: boolean = false) {
    const [subscriptions, setSubscriptions] = useState<SubscriptionResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAll = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = isAdmin ? await subscriptionService.adminGetAll() : await subscriptionService.getAll();
            setSubscriptions(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to fetch subscriptions";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, [isAdmin]);

    const getByUserId = useCallback(async (userId: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const data = isAdmin ? await subscriptionService.adminGetByUserId(userId) : await subscriptionService.getByUserId(userId);
            return data;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to fetch subscription";
            setError(message);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [isAdmin]);

    const updateForUser = useCallback(
        async (userId: string, updateData: UpdateSubscriptionRequest) => {
            try {
                setIsLoading(true);
                setError(null);
                const updated = isAdmin ? await subscriptionService.adminUpdateForUser(userId, updateData) : await subscriptionService.updateForUser(userId, updateData);
                setSubscriptions((prev) =>
                    prev.map((sub) => (sub.userId === userId ? updated : sub))
                );
                return updated;
            } catch (err) {
                const message = err instanceof Error ? err.message : "Failed to update subscription";
                setError(message);
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [isAdmin]
    );

    const remove = useCallback(async (userId: string) => {
        try {
            setIsLoading(true);
            setError(null);
            await (isAdmin ? subscriptionService.adminRemove(userId) : subscriptionService.remove(userId));
            setSubscriptions((prev) => prev.filter((sub) => sub.userId !== userId));
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to remove subscription";
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [isAdmin]);

    const createForUser = useCallback(
        async (userId: string, createData: UpdateSubscriptionRequest) => {
            try {
                setIsLoading(true);
                setError(null);
                const created = isAdmin ? await subscriptionService.adminCreateForUser(userId, createData) : await subscriptionService.createForUser(userId, createData);
                setSubscriptions((prev) => [...prev, created]);
                return created;
            } catch (err) {
                const message = err instanceof Error ? err.message : "Failed to create subscription";
                setError(message);
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [isAdmin]
    );

    return {
        subscriptions,
        isLoading,
        error,
        fetchAll,
        getByUserId,
        updateForUser,
        createForUser,
        remove,
    };
}
