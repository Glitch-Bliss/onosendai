import { NotificationType } from "../enums/notification-type.enum";

// src/app/core/interfaces/notification.interface.ts
export interface AppNotification {
    id: string;
    type: NotificationType;
    message?: string;
    title?: string;
    duration?: number;
    closable?: boolean;
    value?: number;
}

export interface ProgressNotification extends AppNotification {

}

export interface NotificationComplete {
    isComplete: boolean;
    vueLink?: string;
    isShareable?: boolean
}