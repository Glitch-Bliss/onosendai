// src/app/core/interfaces/notification.interface.ts
export interface AppNotification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info' | 'progress';
    message?: string;
    title?: string;
    duration?: number;
    closable?: boolean;
    value?: number;
}

export interface ProgressNotification extends AppNotification {

}