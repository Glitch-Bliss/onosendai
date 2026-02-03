import { Component, input } from '@angular/core';
import { AppNotification } from '../../interfaces/notification.interface';

@Component({
  selector: 'app-notification-component',
  imports: [],
  templateUrl: './notification-component.html',
  styleUrl: './notification-component.scss',
})
export class NotificationComponent {
  notification = input<AppNotification>();
}
