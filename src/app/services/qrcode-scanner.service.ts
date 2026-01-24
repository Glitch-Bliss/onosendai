// src/app/services/barcode-scanner.service.ts
import { Injectable, signal, Signal } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
  BarcodesScannedEvent,
  Barcode,
  CameraPermissionState
} from '@capacitor-mlkit/barcode-scanning';
import { Torch } from '@capawesome/capacitor-torch';

@Injectable({
  providedIn: 'root',
})
export class QrcodeScannerService {
  // Signals
  private _scannedCode = signal<string | null>(null);
  public scannedCode: Signal<string | null> = this._scannedCode;

  private _isScanning = signal(false);
  public isScanning: Signal<boolean> = this._isScanning;

  private _torchEnabled = signal(false);
  public torchEnabled: Signal<boolean> = this._torchEnabled;

  private listener: any = null;

  constructor() { }

  /** Start continuous scanning with event listener */
  async startScan(): Promise<void> {
    if (this._isScanning()) return;

    document.body.classList.add('barcode-scanner-active');
    this._isScanning.set(true);

    // Permissions check
    const permissions = await BarcodeScanner.checkPermissions();
    if (permissions.camera !== 'granted') {
      await BarcodeScanner.requestPermissions();
    }

    // Add listener
    this.listener = await BarcodeScanner.addListener(
      'barcodesScanned',
      async result => {
        console.log(result.barcodes);
      },
    );

    await BarcodeScanner.startScan();
  }

  /** Stop scanning and cleanup */
  async stopScan(): Promise<void> {
    if (!this._isScanning()) return;

    document.body.classList.remove('barcode-scanner-active');
    this._isScanning.set(false);

    if (this.listener) {
      await this.listener.remove();
      this.listener = null;
    }

    await BarcodeScanner.removeAllListeners();
    await BarcodeScanner.stopScan();
  }

  /** Scan a single barcode (returns Promise<Barcode | null>) */
  async scanSingleBarcode(): Promise<Barcode | null> {
    document.body.classList.add('barcode-scanner-active');

    return new Promise(async (resolve) => {
      const listener = await BarcodeScanner.addListener(
        'barcodesScanned',
        async (result: BarcodesScannedEvent) => {
          await listener.remove();
          document.body.classList.remove('barcode-scanner-active');
          await BarcodeScanner.stopScan();
          resolve(result.barcodes.pop() ?? null);
        }
      );

      await BarcodeScanner.startScan();
    });
  }

  /** Direct scan call (optional formats) */
  async scan(formats: BarcodeFormat[] = [BarcodeFormat.QrCode]) {
    const { barcodes } = await BarcodeScanner.scan({
      formats,
      autoZoom: true,
    });
    return barcodes;
  }

  /** Torch controls */
  async enableTorch() {
    await Torch.enable();
    this._torchEnabled.set(true);
  }

  async disableTorch() {
    await Torch.disable();
    this._torchEnabled.set(false);
  }

  async toggleTorch() {
    await Torch.toggle();
    const { enabled } = await Torch.isEnabled();
    this._torchEnabled.set(enabled);
  }

  async isTorchEnabled(): Promise<boolean> {
    const { enabled } = await Torch.isEnabled();
    this._torchEnabled.set(enabled);
    return enabled;
  }

  async isTorchAvailable(): Promise<boolean> {
    const { available } = await Torch.isAvailable();
    return available;
  }

  /** Zoom controls */
  async setZoomRatio(zoomRatio: number) {
    await BarcodeScanner.setZoomRatio({ zoomRatio });
  }

  async getZoomRatio(): Promise<number> {
    const { zoomRatio } = await BarcodeScanner.getZoomRatio();
    return zoomRatio;
  }

  async getMinZoomRatio(): Promise<number> {
    const { zoomRatio } = await BarcodeScanner.getMinZoomRatio();
    return zoomRatio;
  }

  async getMaxZoomRatio(): Promise<number> {
    const { zoomRatio } = await BarcodeScanner.getMaxZoomRatio();
    return zoomRatio;
  }

  /** Settings */
  async openSettings() {
    await BarcodeScanner.openSettings();
  }

  /** Google Barcode Scanner Module */
  async isGoogleBarcodeScannerModuleAvailable(): Promise<boolean> {
    const { available } =
      await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    return available;
  }

  async installGoogleBarcodeScannerModule() {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }

  /** Permissions */
  async checkPermissions(): Promise<CameraPermissionState> {
    const { camera } = await BarcodeScanner.checkPermissions();
    return camera;
  }

  async requestPermissions(): Promise<CameraPermissionState> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera;
  }

  /** Reset scanned code */
  resetScannedCode() {
    this._scannedCode.set(null);
  }
}