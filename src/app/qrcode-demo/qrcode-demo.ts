import { Component, inject, Signal, signal } from '@angular/core';
import { QrcodeScannerService } from '../services/qrcode-scanner.service';
import { Barcode } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-qrcode-demo',
  imports: [],
  templateUrl: './qrcode-demo.html',
  styleUrl: './qrcode-demo.scss',
})
export class QrcodeDemo {

  _scannedCode = signal<string | undefined>(undefined);

  constructor(public qrService: QrcodeScannerService) {}

  scan() {
    this.qrService.scanSingleBarcode().then( barcode => {
      this._scannedCode.set(barcode?.rawValue?.toString());
    });
  }

  reset() {
    this.qrService.resetScannedCode();
  }
}
