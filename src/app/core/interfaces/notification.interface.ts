import { NotificationType } from "../enums/notification-type.enum";

// src/app/core/interfaces/notification.interface.ts
export interface IAppNotification {
    id: string;
    type: NotificationType;
    message?: string;
    title?: string;
    duration?: number;
    closable?: boolean;
    value?: number;
    view?:boolean;
    share?:boolean;
}

export interface IProgressNotification extends IAppNotification {

}

export interface INotificationComplete {
    isComplete: boolean;
    vueLink?: string;
    isShareable?: boolean
}