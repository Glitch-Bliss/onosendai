// src/app/services/barcode-scanner.service.ts
import { computed, effect, Injectable, NgZone, signal, Signal, WritableSignal } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
  BarcodesScannedEvent,
  Barcode,
  CameraPermissionState,
  Resolution
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
  private readonly _state: WritableSignal<ScanState> = signal<ScanState>('idle');
  private readonly _scanResult: WritableSignal<Barcode[]> = signal<Barcode[]>([]);
  private readonly _torchEnabled: WritableSignal<boolean> = signal(false);
  private readonly _lastScanDuration: WritableSignal<number> = signal(0);
  private listener?: PluginListenerHandle;
  private timeoutHandle?: number;

  /** ===========================
   * Public read-only signals
   * =========================== */
  public readonly state = this._state.asReadonly();
  public readonly scanResult = this._scanResult.asReadonly();
  public readonly lastBarcode = computed(() => this._scanResult().at(-1) ?? null);
  public readonly isScanning = computed(() => this._state() === 'scanning');
  public readonly torchEnabled: Signal<boolean> = this._torchEnabled;
  public readonly lastScanDuration: Signal<number> = this._lastScanDuration;

  private autoStopEffect = effect(() => {
    if (this._state() === 'paused') {
      // schedule async stop, don’t run native code directly
      queueMicrotask(() => this.stop());
    }
  });


  constructor(private readonly ngZone: NgZone) { }

  /** ===========================
   * Start scanning (single or continuous)
   * =========================== */
  async startScan(mode: ScanMode = 'continuous', timeoutMs?: number) {
    if (this._state() !== 'idle') return;

    this.ngZone.run(() => {
      this._state.set('scanning');
      this.resetScannedCode();
      document.body.classList.add('barcode-scanner-active');
    });

    await this.ensurePermissions();

    // Listener (native callback → re-enter Angular explicitly)
    this.listener = await BarcodeScanner.addListener(
      'barcodesScanned',
      ({ barcodes }: BarcodesScannedEvent) => {
        this.ngZone.run(() => {
          this._scanResult.set(barcodes);

          if (mode === 'single') {
            this._state.set('paused');
          }
        });
      }
    );

    // Start scan outside Angular
    await this.ngZone.runOutsideAngular(() =>
      BarcodeScanner.startScan({
        formats: [BarcodeFormat.QrCode],
        lensFacing: LensFacing.Back,
        resolution: Resolution['1920x1080'],
      })
    );

    this.ngZone.run(() => {
      this._lastScanDuration.set(new Date().getSeconds());
    });

    if (timeoutMs) {
      this.timeoutHandle = window.setTimeout(
        () => this.ngZone.run(() => this.stop()),
        timeoutMs
      );
    }
  }


  /** ===========================
   * Stop scanning and cleanup
   * =========================== */
  async stop() {
    if (this._state() === 'idle') return;

    const startSeconds = this._lastScanDuration();

    await this.ngZone.runOutsideAngular(async () => {
      await this.listener?.remove();
      this.listener = undefined;
      await BarcodeScanner.stopScan();
    });

    this.ngZone.run(() => {
      this._lastScanDuration.set(new Date().getSeconds() - startSeconds);

      if (this.timeoutHandle) {
        clearTimeout(this.timeoutHandle);
        this.timeoutHandle = undefined;
      }

      this._state.set('idle');
      document.body.classList.remove('barcode-scanner-active');
    });
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

  async googleScan(): Promise<void> {
    this.ngZone.run(() => {
      this._lastScanDuration.set(new Date().getSeconds());
    });

    const { barcodes } = await this.ngZone.runOutsideAngular(() =>
      BarcodeScanner.scan()
    );

    this.ngZone.run(() => {
      this._lastScanDuration.update(
        lastSeconds => new Date().getSeconds() - lastSeconds
      );
      this._scanResult.set(barcodes);
    });
  }

  /** Torch controls */
  async enableTorch() {
    await this.ngZone.runOutsideAngular(() => Torch.enable());
    this.ngZone.run(() => this._torchEnabled.set(true));
  }

  async disableTorch() {
    await Torch.disable();
    this._torchEnabled.set(false);
  }

  async toggleTorch() {
    await this.ngZone.runOutsideAngular(() => Torch.toggle());
    const { enabled } = await Torch.isEnabled();
    this.ngZone.run(() => this._torchEnabled.set(enabled));
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