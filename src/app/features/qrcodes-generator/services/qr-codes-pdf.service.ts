import { Injectable } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';
import { ElementType } from '../../../core/enums/element-type.enum';
import { QR_TYPE_REGISTRY } from '../../../core/registries/qr-type.registry';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

const CM_TO_PT = 28.35;
const QR_SIZE_PT = 2 * CM_TO_PT;
const LOGO_RATIO = 0.2;
const LOGO_SIZE_PT = QR_SIZE_PT * LOGO_RATIO;

@Injectable({ providedIn: 'root' })
export class QrCodesPdfService {

  async export(
    qrCodesMatrixes: number[][][]
    , type: ElementType,
    onProgress?: (value: number, isProgressing: boolean) => void) {

    const pdf = await PDFDocument.create();
    onProgress?.(0, true);
    const page = pdf.addPage();
    const { width, height } = page.getSize();

    let x = 40;
    let y = height - 40;

    for (let i = 0; i < qrCodesMatrixes.length; i++) {
      const matrix: number[][] = qrCodesMatrixes[i];

      const moduleSize = QR_SIZE_PT / matrix.length;
      for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix.length; col++) {
          if (matrix[row][col]) {
            page.drawRectangle({
              x: x + col * moduleSize,
              y: y - QR_SIZE_PT + row * moduleSize,
              width: moduleSize,
              height: moduleSize,
              color: rgb(0, 0, 0),
            });
          }
        }
      }

      // ── Logo background (white safety zone) ─
      const logoBgSize = LOGO_SIZE_PT + 3;
      const radius = logoBgSize / 2;
      page.drawCircle({
        x: x + QR_SIZE_PT / 2,
        y: y - QR_SIZE_PT / 2,
        size: radius,
        color: rgb(1, 1, 1),
      });

      // ── Draw logo centered ──────────────────
      const logoBuffer = await fetch(QR_TYPE_REGISTRY[type].image).then(r => r.arrayBuffer());
      const logoImg = await pdf.embedPng(logoBuffer);

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

      onProgress?.(Math.ceil(((i + 1) / qrCodesMatrixes.length) * 100), true);
    }

    // ── Save PDF ─────────────────────────────
    if (Capacitor.isNativePlatform()) {
      const pdfBase64 = await pdf.saveAsBase64();
      await this.saveFile(`Generated QRCodes for ${type}.pdf`, pdfBase64);
      onProgress?.(100, false);
    } else {
      const bytes = await pdf.save();
      await this.downloadOnDesktop(bytes, "qr-codes-" + type);
      onProgress?.(100, false);
    }
  }

  private async saveFile(fileName: string, base64: string): Promise<string> {
    const result = await Filesystem.writeFile({
      path: fileName,
      data: base64,
      directory: Directory.Documents,
    });
    return result.uri;
  }

  private async downloadOnDesktop(bytes: Uint8Array, name: string) {
    // Modern File System Access API
    if ('showSaveFilePicker' in window) {
      try {
        const handle = await (window as any).showSaveFilePicker({
          suggestedName: name + '.pdf',
          types: [
            {
              description: 'PDF Document',
              accept: { 'application/pdf': ['.pdf'] },
            },
          ],
        });

        const writable = await handle.createWritable();
        await writable.write(bytes);
        await writable.close();
        console.info('PDF saved successfully!');
      } catch (err) {
        console.error('Save cancelled or failed:', err);
      }
    } else {
      // Fallback for older browsers: force download (opens in-browser temporarily)
      const blob = new Blob([new Uint8Array(bytes)], { type: 'application/pdf' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = name + '.pdf'; // keep the .pdf name
      link.click();
      URL.revokeObjectURL(link.href);
    }
  }

}
