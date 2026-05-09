import axios from "@/lib/axios";
import { SubscriptionPlan } from "@/types";

export interface SubscriptionResponse {
    id: string;
    userId: string;
    plan: SubscriptionPlan;
    status: "ACTIVE" | "EXPIRED" | "CANCELLED";
    expiresAt?: string;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        email: string;
        firstName?: string;
        lastName?: string;
    };
}

export interface UpdateSubscriptionRequest {
    plan?: SubscriptionPlan;
    status?: "ACTIVE" | "EXPIRED" | "CANCELLED";
    expiresAt?: string;
}

class SubscriptionService {

    async getAll() {
        const response = await axios.get<SubscriptionResponse[]>(
            "/subscriptions"
        );
        return response.data;
    }


    async getByUserId(userId: string) {
        const response = await axios.get<SubscriptionResponse>(
            `/subscriptions/${userId}`
        );
        return response.data;
    }

    async getMe() {
        const response = await axios.get<SubscriptionResponse>(`/subscriptions/me`);
        return response.data;
    }


    async updateForUser(userId: string, data: UpdateSubscriptionRequest) {
        const response = await axios.patch<SubscriptionResponse>(
            `/subscriptions/${userId}`,
            data
        );
        return response.data;
    }


    async remove(userId: string) {
        const response = await axios.patch(`/subscriptions/${userId}/deactivate`);
        return response.data;
    }

    async createForUser(userId: string, data: UpdateSubscriptionRequest) {
        const response = await axios.post<SubscriptionResponse>(
            `/subscriptions/${userId}`,
            data
        );
        return response.data;
    }

    // Admin routes (use when calling from admin UI)
    async adminGetAll() {
        const response = await axios.get<SubscriptionResponse[]>("/admin/subscriptions");
        return response.data;
    }

    async adminGetByUserId(userId: string) {
        const response = await axios.get<SubscriptionResponse>(`/admin/subscriptions/${userId}`);
        return response.data;
    }

    async adminUpdateForUser(userId: string, data: UpdateSubscriptionRequest) {
        const response = await axios.patch<SubscriptionResponse>(`/admin/subscriptions/${userId}`, data);
        return response.data;
    }

    async adminRemove(userId: string) {
        const response = await axios.patch(`/admin/subscriptions/${userId}/deactivate`);
        return response.data;
    }
    async adminActivate(userId: string) {
        const response = await axios.patch(`/admin/subscriptions/${userId}/activate`);
        return response.data;
    }
    async adminCreateForUser(userId: string, data: UpdateSubscriptionRequest) {
        const response = await axios.post<SubscriptionResponse>(`/admin/subscriptions/${userId}`, data);
        return response.data;
    }


    isActive(subscription?: SubscriptionResponse | null): boolean {
        if (!subscription) return false;
        if (subscription.status !== "ACTIVE") return false;
        if (subscription.expiresAt) {
            return new Date(subscription.expiresAt) > new Date();
        }
        return true;
    }


    getStatusDisplay(subscription?: SubscriptionResponse | null): string {
        if (!subscription) return "No subscription";
        if (subscription.status === "ACTIVE") {
            if (subscription.expiresAt) {
                const expiresAt = new Date(subscription.expiresAt);
                const now = new Date();
                if (expiresAt < now) return "Expired";
                const daysLeft = Math.ceil(
                    (expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
                );
                return `Active - ${daysLeft} days left`;
            }
            return "Active";
        }
        return subscription.status;
    }

   
}

export const subscriptionService = new SubscriptionService();
