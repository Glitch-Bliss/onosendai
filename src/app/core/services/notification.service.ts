import { Injectable, signal, WritableSignal } from '@angular/core';
import { IAppNotification } from '../interfaces/notification.interface';
import { nanoid } from 'nanoid';
import { NotificationType } from '../enums/notification-type.enum';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private readonly _notifications = signal<IAppNotification[]>([]);
  readonly notifications = this._notifications.asReadonly();
  private lastValue = 0;
  private lastUpdate = 0;

  // ── Public API ─────────────────────────────

  info(message: string) {
    this.add({
      id: crypto.randomUUID(),
      type: NotificationType.INFO,
      message,
    });
  }

  infoWithViewAndShare(message: string) {
    this.add({
      id: crypto.randomUUID(),
      type: NotificationType.INFO,
      view:true,
      share:true,
      message,
    });
  }

  error(message: string) {
    this.add({
      id: crypto.randomUUID(),
      type: NotificationType.ERROR,
      message,
    });
  }

  success(message: string) {
    this.add({
      id: crypto.randomUUID(),
      type: NotificationType.SUCCESS,
      message,
    });
  }

  startProgress(message = 'Processing…'): IAppNotification {
    const progressNotification = {
      id: nanoid(2),
      type: NotificationType.PROGRESS,
      value: 0,
      message: message,
    };

    this.add(progressNotification);
    return progressNotification;
  }

  updateProgress(notification: IAppNotification, valueToAdd: number) {

    const value = notification.value ?? 0;

    //Adds a little bit of throttling
    const now = performance.now();

    if (
      notification.value === 100 ||
      now - this.lastUpdate > 80 || // ~12 FPS
      Math.abs(value - this.lastValue) >= 2
    ) {
      this.lastValue = value;
      this.lastUpdate = now;

      const currentProgressNotification = this._notifications().find(n => n.id === notification.id);

      if (currentProgressNotification != undefined) {
        const currentValue = value + valueToAdd;
        this.upsert({
          id: currentProgressNotification.id,
          type: NotificationType.PROGRESS,
          value: Math.min(Math.max(currentValue, 0), 100),
          message: currentProgressNotification.message
        });
      }
    }
  }

  complete(notificationProgress: IAppNotification) {
    this._notifications.update(list =>
      list.filter(n => n.id !== notificationProgress.id)
    );
  }

  // ── Internals ──────────────────────────────

  private add(n: IAppNotification) {
    this._notifications.update(list => [...list, n]);
  }

  private upsert(notification: IAppNotification) {
    this._notifications.update(list => {
      const index = list.findIndex(n => n.id === notification.id);

      if (index !== -1) {
        return list.map((n, i) =>
          i === index ? { ...n, ...notification } : n
        );
      }

      return [...list, notification];
    });
  }

  dismiss(id: string) {
    this._notifications.update(list =>
      list.filter(n => n.id !== id)
    );
  }
}
