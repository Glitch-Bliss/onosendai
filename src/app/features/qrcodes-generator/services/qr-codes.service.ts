import { Injectable } from '@angular/core';
import { QR_TYPE_REGISTRY } from '../../../core/registries/qr-type.registry';
import { ElementType } from '../../../core/enums/element-type.enum';
import { Encoded } from '@nuintun/qrcode';

@Injectable({ providedIn: 'root' })
export class QrCodesService {

  private workerGenerator?: Worker;
  private workerGifToPng?: Worker;

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
          console.info("prout");
        }
      };

      this.workerGenerator!.onerror = reject;

      this.workerGenerator!.postMessage(qrCodesCodes);
    });
  }

  convertGifQrCodesToPng(images: string[]): Promise<string[]> {
    if (!this.workerGifToPng) {
      this.workerGifToPng = new Worker(
        new URL('./../workers/gif-to-png.worker', import.meta.url),
        { type: 'module' }
      );
    }
    return new Promise((resolve, reject) => {
      this.workerGifToPng!.onmessage = ({ data }) => {
        if (data.type === 'done') {
          console.info("never done ? ");
          resolve(data.images);
        }
        if (data.type === 'progress') {
          console.info("prout prout");
        }
      };

      this.workerGifToPng!.onerror = reject;

      this.workerGifToPng!.postMessage(images);
    });
  }

}
