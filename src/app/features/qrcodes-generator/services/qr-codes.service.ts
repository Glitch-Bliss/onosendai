import { Injectable } from '@angular/core';
import { QrItem } from '../models/qr-item.model';
import QRCode from 'qrcode';
import { QR_TYPE_REGISTRY } from '../../../core/registries/qr-type.registry';

@Injectable({ providedIn: 'root' })
export class QrCodesService {

  generateQrCodesDataURI(qr: QrItem): Promise<string> {
    const shortenedQrCode: string = `${qr.userid}|${qr.uid}|${QR_TYPE_REGISTRY[qr.type].qrcodeIndex}`;
    return QRCode.toDataURL(btoa(shortenedQrCode), {
      errorCorrectionLevel: 'M', // REQUIRED if image nearby
      margin: 1,
      width: 512,               // high-res source
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });
  }

  generateQrCodesDataURIBatch(qrs: QrItem[]): Promise<string[]> {
    return Promise.all(qrs.map(qr => this.generateQrCodesDataURI(qr)));
  }

}
