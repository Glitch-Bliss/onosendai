import { Injectable } from '@angular/core';
import { QrItem } from '../models/qr-item.model';
import QRCode from 'qrcode';

@Injectable({ providedIn: 'root' })
export class QrCodesFacade {

  async generateQrCodesDataURI(qr: QrItem): Promise<string> {
    return QRCode.toDataURL(JSON.stringify(qr), {
      errorCorrectionLevel: 'H', // REQUIRED if image nearby
      margin: 1,
      width: 512,               // high-res source
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });
  }

  async generateQrCodesDataURIBatch(qrs: QrItem[]): Promise<string[]> {
    return Promise.all(qrs.map(qr => this.generateQrCodesDataURI(qr)));
  }

}
