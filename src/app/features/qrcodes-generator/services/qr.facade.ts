import { Injectable } from '@angular/core';
import { QrItem } from '../models/qr-item.model';

@Injectable({ providedIn: 'root' })
export class QrFacade {

  static generateQrCodeCode(item: QrItem): string {
    const json = JSON.stringify(item);
    return btoa(json)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

}
