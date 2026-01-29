import { inject, Injectable } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';
import { ElementType } from '../../../core/enums/element-type.enum';
import { QR_TYPE_REGISTRY } from '../../../core/registries/qr-type.registry';
import { ProgressService } from '../../../core/services/progression.service';

const CM_TO_PT = 28.35;
const QR_SIZE_PT = 2 * CM_TO_PT;
const LOGO_RATIO = 0.2;
const LOGO_SIZE_PT = QR_SIZE_PT * LOGO_RATIO;

@Injectable({ providedIn: 'root' })
export class QrCodesPdfService {

  progressService = inject(ProgressService);

  async export(qrImages: string[], types: ElementType[]) {
    
    this.progressService.start("Generating codes");
    
    const pdf = await PDFDocument.create();
    this.progressService.set(10);
    const page = pdf.addPage();

    const { width, height } = page.getSize();

    let x = 40;
    let y = height - 40;

    for (let i = 0; i < qrImages.length; i++) {

      const qrImg = await pdf.embedPng(qrImages[i]);

      const logoBuffer = await fetch(
        QR_TYPE_REGISTRY[types[i]].image
      ).then(r => r.arrayBuffer());

      const logoImg = await pdf.embedPng(logoBuffer);

      // ── Draw QR ─────────────────────────────
      page.drawImage(qrImg, {
        x,
        y: y - QR_SIZE_PT,
        width: QR_SIZE_PT,
        height: QR_SIZE_PT,
      });

      // ── Logo background (white safety zone) ─
      const logoBgSize = LOGO_SIZE_PT + 3;
      const radius = logoBgSize /2;
      page.drawCircle({
        x: x + (QR_SIZE_PT) / 2,
        y: y - (QR_SIZE_PT) / 2,
        size: radius,
        color: rgb(1, 1, 1),
      });

      // ── Draw logo centered ──────────────────
      page.drawImage(logoImg, {
        x: x + (QR_SIZE_PT - LOGO_SIZE_PT) / 2,
        y: y - (QR_SIZE_PT + LOGO_SIZE_PT) / 2,
        width: LOGO_SIZE_PT,
        height: LOGO_SIZE_PT,
      });

      // ── Grid positioning ────────────────────
      x += QR_SIZE_PT + 20;

      if (x + QR_SIZE_PT > width) {
        x = 40;
        y -= QR_SIZE_PT + 20;
      }

      this.progressService.set(Math.ceil(i/qrImages.length*100));
    }

    const bytes = await pdf.save();
    this.download(bytes);
  }

  private download(bytes: Uint8Array) {
    const blob = new Blob([new Uint8Array(bytes)], {
      type: 'application/pdf',
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'qr-codes.pdf';
    link.click();

    this.progressService.complete();
    URL.revokeObjectURL(link.href);
  }
}
