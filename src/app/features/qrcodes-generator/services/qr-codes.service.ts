import { Injectable } from '@angular/core';
import { QR_TYPE_REGISTRY } from '../../../core/registries/qr-type.registry';
import { ElementType } from '../../../core/enums/element-type.enum';
import { Encoded } from '@nuintun/qrcode';

@Injectable({ providedIn: 'root' })
export class QrCodesService {

  private workerGenerator?: Worker;

  generateQrCodesDataUriByWorker(qrCodesCodes: string[]): Promise<number[][][]> {

    if (!this.workerGenerator) {
      this.workerGenerator = new Worker(
        new URL('./../workers/qrcode-generator.worker', import.meta.url),
        { type: 'module' }
      );
    }

    return new Promise((resolve, reject) => {
      this.workerGenerator!.onmessage = ({ data }) => {
        if (data.type === 'done') {
          resolve(data.images)
        }
        if (data.type === 'progress') {
          //update progress
        }
      };

      this.workerGenerator!.onerror = reject;

      this.workerGenerator!.postMessage(qrCodesCodes);
    });
  }

}
