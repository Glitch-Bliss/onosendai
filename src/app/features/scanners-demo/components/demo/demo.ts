import { Component, inject, signal } from '@angular/core';
import { QrcodeScannerService } from '../../../../core/services/qrcode-scanner.service';
import { ButtonComponent } from "../../../../shared/components/button-component/button-component";
import { ScanService } from '../../../../core/services/scan.service';

@Component({
  standalone: true,
  selector: 'app-scanners-demo',
  imports: [ButtonComponent],
  templateUrl: './demo.html',
  styleUrl: './demo.scss',
})
export class QrcodeDemo {

  scanFallbackModalService = inject(ScanService);
  qrService = inject(QrcodeScannerService);

  _scannedCode = signal<string | undefined>(undefined);

  async scanWithGoogle() {
    if (await this.qrService.isGoogleBarcodeScannerModuleAvailable()) {
      this.qrService.googleScan();
    } else {
      await this.qrService.installGoogleBarcodeScannerModule();
    }
  }

  scan() {
    this.scanFallbackModalService.scanModalShown.set(true);
    //this.qrService.startScan('single');
  }

  reset() {
    this.qrService.resetScannedCode();
  }
}
