import { Component, inject, input } from '@angular/core';
import { IAppNotification } from '../../interfaces/notification.interface';
import { QrCodesPdfService } from '../../../features/qrcodes-generator/services/qr-codes-pdf.service';
import { Capacitor } from '@capacitor/core';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-notification-component',
  imports: [],
  templateUrl: './notification-component.html',
  styleUrl: './notification-component.scss',
})
export class NotificationComponent {
  notificationService = inject(NotificationService);
  notification = input<IAppNotification>();
  pdfService = inject(QrCodesPdfService);
  capacitor = Capacitor;

  close() {
    const notification = this.notification();
    if (!notification) return;

    this.notificationService.complete(notification);
  }

  /**
   * Used to show generated qrcode file from eye in notification
   */
  showFile() {
    this.pdfService.showGeneratedFile();
  }

  /**
   * Use to allow sharing of file
   */
  shareFile() {
    this.pdfService.shareGeneratedFile();
  }

}
