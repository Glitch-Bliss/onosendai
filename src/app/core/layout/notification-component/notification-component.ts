import { Component, inject, input } from '@angular/core';
import { AppNotification } from '../../interfaces/notification.interface';
import { QrCodesPdfService } from '../../../features/qrcodes-generator/services/qr-codes-pdf.service';
import { Capacitor } from '@capacitor/core';


@Component({
  selector: 'app-notification-component',
  imports: [],
  templateUrl: './notification-component.html',
  styleUrl: './notification-component.scss',
})
export class NotificationComponent {
  notification = input<AppNotification>();
  pdfService = inject(QrCodesPdfService);
  capacitor = Capacitor;

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
