
import { auth } from "@clerk/nextjs";
import { useEffect } from "react";
import { getNotificationByToId } from "./actions/notification.actions";

export const getCurrentUserId = (): string | null => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    return userId || null;
};


export const notificationData = (userId: string) => {
    try {
        const data =  getNotificationByToId(userId);
        return data
    } catch (error) {
        
    }
} 