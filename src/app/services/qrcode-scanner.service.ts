// src/app/services/barcode-scanner.service.ts
import { computed, effect, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
  PermissionStatus,
  BarcodesScannedEvent,
  Barcode,
  CameraPermissionState
} from '@capacitor-mlkit/barcode-scanning';
import { PluginListenerHandle } from '@capacitor/core';
import { Torch } from '@capawesome/capacitor-torch';

type ScanMode = 'single' | 'continuous';
type ScanState = 'idle' | 'scanning' | 'paused';

@Injectable({
  providedIn: 'root',
})
export class QrcodeScannerService {


  /** ===========================
   * Internal mutable state
   * =========================== */
  private readonly _state = signal<ScanState>('idle');
  private readonly _scanResult = signal<Barcode[]>([]);
  private listener?: PluginListenerHandle;
  private timeoutHandle?: number;
  private _torchEnabled = signal(false);

  /** ===========================
   * Public read-only signals
   * =========================== */
  public readonly state = this._state.asReadonly();
  public readonly scanResult = this._scanResult.asReadonly();
  public readonly lastBarcode = computed(() => this._scanResult().at(-1) ?? null);
  public readonly isScanning = computed(() => this._state() === 'scanning');
  public torchEnabled: Signal<boolean> = this._torchEnabled;


  private autoStopEffect = effect(() => {
    if (this._state() === 'paused') {
      this.stop();
    }
  });

  /** ===========================
   * Start scanning (single or continuous)
   * =========================== */
  async start(mode: ScanMode = 'continuous', timeoutMs?: number) {
    if (this._state() !== 'idle') return;

    this._state.set('scanning');
    this.resetScannedCode();
    document.body.classList.add('barcode-scanner-active');

    await this.ensurePermissions();

    // Setup listener
    this.listener = await BarcodeScanner.addListener(
      'barcodesScanned',
      async ({ barcodes }: BarcodesScannedEvent) => {
        this._scanResult.set(barcodes);

        if (mode === 'single') {
          // Pause scanning for single mode
          this._state.set('paused');
        }
      }
    );

    await BarcodeScanner.startScan();

    // Optional timeout
    if (timeoutMs) {
      this.timeoutHandle = window.setTimeout(() => this.stop(), timeoutMs);
    }

  }

  /** ===========================
   * Stop scanning and cleanup
   * =========================== */
  async stop() {
    if (this._state() === 'idle') return;

    // Cleanup listener
    await this.listener?.remove();
    this.listener = undefined;

    // Stop scanner
    await BarcodeScanner.stopScan();

    // Clear timeout if any
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = undefined;
    }

    // Update state and DOM
    this._state.set('idle');
    document.body.classList.remove('barcode-scanner-active');
  }

  /** ===========================
   * Permission check helper
   * =========================== */
  private async ensurePermissions(): Promise<void> {
    const { camera } = await BarcodeScanner.checkPermissions();
    if (camera !== 'granted') {
      await BarcodeScanner.requestPermissions();
    }
  }

  /** ===========================
   * Cancel scan without affecting last result
   * =========================== */
  cancel() {
    if (this._state() === 'scanning') {
      this.stop();
    }
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
    this._scanResult.set([]);
  }
}