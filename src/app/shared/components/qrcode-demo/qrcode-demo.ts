import { Component, inject, Signal, signal } from '@angular/core';
import { QrcodeScannerService } from '../../../core/services/qrcode-scanner.service';
import { Barcode } from '@capacitor-mlkit/barcode-scanning';
import { single } from 'rxjs';

@Component({
  selector: 'app-qrcode-demo',
  imports: [],
  templateUrl: './qrcode-demo.html',
  styleUrl: './qrcode-demo.scss',
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
