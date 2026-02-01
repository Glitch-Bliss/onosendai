import { Injectable, signal, WritableSignal } from '@angular/core';
import { AppNotification } from '../interfaces/notification.interface';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private readonly _notifications = signal<AppNotification[]>([]);
  readonly notifications = this._notifications.asReadonly();

  // ── Public API ─────────────────────────────

  info(message: string) {
    this.add({
      id: crypto.randomUUID(),
      type: 'info',
      message,
    });
  }

  error(message: string) {
    this.add({
      id: crypto.randomUUID(),
      type: 'error',
      message,
    });
  }

  success(message: string) {
    this.add({
      id: crypto.randomUUID(),
      type: 'success',
      message,
    });
  }

  startProgress(message = 'Processing…') {
    this.add({
      id: 'global-progress',
      type: 'progress',
      value: 0,
      message: message,
    });
  }

  updateProgress(value: number) {
    const currentProgressNotification = this._notifications().find(n => n.type === "progress");

    if (currentProgressNotification != undefined) {
      const currentValue = currentProgressNotification.value ? currentProgressNotification.value + value : value;
      this.upsert({
        id: currentProgressNotification.id,
        type: 'progress',
        value: Math.min(Math.max(currentValue, 0), 100),
        message: currentProgressNotification.message
      });
    }
  }

  completeProgress() {
    this._notifications.update(list =>
      list.filter(n => n.type !== 'progress')
    );
  }

  // ── Internals ──────────────────────────────

  private add(n: AppNotification) {
    this._notifications.update(list => [...list, n]);
  }

  private upsert(notification: AppNotification) {
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
