import { Component, computed, effect, inject, signal } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { AppNotification, ProgressNotification } from '../../interfaces/notification.interface';
import { ProgressbarComponent } from "../progressbar-component/progressbar-component";

@Component({
  selector: 'app-notifications-component',
  imports: [ProgressbarComponent],
  templateUrl: './notifications-component.html',
  styleUrl: './notifications-component.scss',
})

export class NotificationsComponent {
  notificationService = inject(NotificationService);
  readonly notifications = signal<AppNotification[]>([]);
}
