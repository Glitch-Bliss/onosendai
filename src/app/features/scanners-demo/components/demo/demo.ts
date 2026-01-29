import { Component, inject, Signal, signal } from '@angular/core';
import { QrcodeScannerService } from '../../../../core/services/qrcode-scanner.service';

@Component({
  standalone: true,
  selector: 'app-scanners-demo',
  imports: [],
  templateUrl: './demo.html',
  styleUrl: './demo.scss',
})
export class QrcodeDemo {

  _scannedCode = signal<string | undefined>(undefined);

  constructor(public qrService: QrcodeScannerService) { }

  async scanWithGoogle() {
    if (await this.qrService.isGoogleBarcodeScannerModuleAvailable()) {
      this.qrService.googleScan();
    } else {
      await this.qrService.installGoogleBarcodeScannerModule();
    }
  }

  scan() {
    this.qrService.startScan('single');
  }

  reset() {
    this.qrService.resetScannedCode();
  }
}
