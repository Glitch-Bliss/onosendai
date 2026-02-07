import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { IAppNotification, IProgressNotification } from '../../interfaces/notification.interface';

@Component({
  selector: 'app-progressbar-component',
  imports: [],
  templateUrl: './progressbar-component.html',
  styleUrl: './progressbar-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressbarComponent {
  notification = input<IAppNotification>();
  progressService = inject(NotificationService);
  scale = computed(() => (this.notification()?.value ?? 0) / 100);

}