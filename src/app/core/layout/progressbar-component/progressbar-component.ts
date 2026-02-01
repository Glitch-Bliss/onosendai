import { Component, inject, input } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { AppNotification, ProgressNotification } from '../../interfaces/notification.interface';

@Component({
  selector: 'app-progressbar-component',
  imports: [],
  templateUrl: './progressbar-component.html',
  styleUrl: './progressbar-component.scss',
  host: {
    role: 'progressbar',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    '[attr.aria-valuenow]': 'notification()?.value',
  }
})
export class ProgressbarComponent {
  notification = input<AppNotification>();
  progressService = inject(NotificationService);
}
