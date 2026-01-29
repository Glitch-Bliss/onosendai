import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { ElementType } from '../../../core/enums/element-type.enum';
import { QR_TYPE_REGISTRY } from '../../../core/registries/qr-type.registry';

const CM_TO_PT = 28.35;
const QR_SIZE_PT = 2 * CM_TO_PT;
const GAP = 8;

@Injectable({ providedIn: 'root' })
export class QrCodesPdfService {

  async export(
    qrImages: string[],
    types: ElementType[]
  ) {
    const pdf = await PDFDocument.create();
    const page = pdf.addPage();

    const { width, height } = page.getSize();

    let x = 40;
    let y = height - 40;

    for (let i = 0; i < qrImages.length; i++) {
      const qrImg = await pdf.embedPng(qrImages[i]);
      const typeImg = await pdf.embedJpg(
        await fetch(QR_TYPE_REGISTRY[types[i]].image).then(r => r.arrayBuffer())
      );

      // QR
      page.drawImage(qrImg, {
        x,
        y: y - QR_SIZE_PT,
        width: QR_SIZE_PT,
        height: QR_SIZE_PT,
      });

      // Associated image
      page.drawImage(typeImg, {
        x: x + QR_SIZE_PT + GAP,
        y: y - QR_SIZE_PT,
        width: QR_SIZE_PT,
        height: QR_SIZE_PT,
      });

      x += (QR_SIZE_PT * 2) + GAP * 2;

      if (x + QR_SIZE_PT * 2 > width) {
        x = 40;
        y -= QR_SIZE_PT + 20;
      }
    }

    const bytes = await pdf.save();
    this.download(bytes);
  }

  private download(bytes: Uint8Array) {
    const blob = new Blob([new Uint8Array(bytes)], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'qr-codes.pdf';
    link.click();
  }
}
