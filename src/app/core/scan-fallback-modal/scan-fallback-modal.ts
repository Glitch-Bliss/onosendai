import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  BarcodeFormat,
  BarcodeScanner,
  LensFacing,
  Resolution,
  StartScanOptions,
} from '@capacitor-mlkit/barcode-scanning';
import { Capacitor } from '@capacitor/core';
import { ScanService } from '../services/scan.service';

@Component({
  selector: 'app-scan-fallback-modal',
  imports: [],
  templateUrl: './scan-fallback-modal.html',
  styleUrl: './scan-fallback-modal.scss'
})
export class ScanFallbackModal implements AfterViewInit, OnDestroy {

  @ViewChild('square')
  public squareElement: ElementRef<HTMLDivElement> | undefined;

  public isTorchAvailable = false;
  public isWeb = Capacitor.getPlatform() === 'web';
  public minZoomRatio: number | undefined;
  public maxZoomRatio: number | undefined;

  private scanFallbackModalService = inject(ScanService);

  constructor(
    private readonly ngZone: NgZone,
  ) { }

  public ngAfterViewInit(): void {
    document.querySelector('body')?.classList.add('barcode-scanner-active');

    this.startScan().then(() => {
      if (this.isWeb) {
        return;
      }
    });


    // setTimeout(() => {
    //   this.startScan().then(() => {
    //     if (this.isWeb) {
    //       return;
    //     }
    //     BarcodeScanner.isTorchAvailable().then((result) => {
    //       this.isTorchAvailable = result.available;
    //     });
    //   });
    // }, 500);
  }

  public ngOnDestroy(): void {
    this.stopScan();
  }

  public async closeModal(): Promise<void> {
    this.scanFallbackModalService.scanModalShown.set(false);
  }

  private async startScan(): Promise<void> {
    const options: StartScanOptions = {
      formats: [BarcodeFormat.QrCode],
      lensFacing: LensFacing.Back
    };

    const squareElementBoundingClientRect =
      this.squareElement?.nativeElement.getBoundingClientRect();
    const scaledRect = squareElementBoundingClientRect
      ? {
        left: squareElementBoundingClientRect.left * window.devicePixelRatio,
        right:
          squareElementBoundingClientRect.right * window.devicePixelRatio,
        top: squareElementBoundingClientRect.top * window.devicePixelRatio,
        bottom:
          squareElementBoundingClientRect.bottom * window.devicePixelRatio,
        width:
          squareElementBoundingClientRect.width * window.devicePixelRatio,
        height:
          squareElementBoundingClientRect.height * window.devicePixelRatio,
      }
      : undefined;
    const detectionCornerPoints = scaledRect
      ? [
        [scaledRect.left, scaledRect.top],
        [scaledRect.left + scaledRect.width, scaledRect.top],
        [
          scaledRect.left + scaledRect.width,
          scaledRect.top + scaledRect.height,
        ],
        [scaledRect.left, scaledRect.top + scaledRect.height],
      ]
      : undefined;
    const listener = await BarcodeScanner.addListener(
      'barcodesScanned',
      async (event) => {
        this.ngZone.run(() => {
          const firstBarcode = event.barcodes[0];
          if (!firstBarcode) {
            return;
          }
          const cornerPoints = firstBarcode.cornerPoints;
          if (
            detectionCornerPoints &&
            cornerPoints &&
            Capacitor.getPlatform() !== 'web'
          ) {
            if (
              detectionCornerPoints[0][0] > cornerPoints[0][0] ||
              detectionCornerPoints[0][1] > cornerPoints[0][1] ||
              detectionCornerPoints[1][0] < cornerPoints[1][0] ||
              detectionCornerPoints[1][1] > cornerPoints[1][1] ||
              detectionCornerPoints[2][0] < cornerPoints[2][0] ||
              detectionCornerPoints[2][1] < cornerPoints[2][1] ||
              detectionCornerPoints[3][0] > cornerPoints[3][0] ||
              detectionCornerPoints[3][1] < cornerPoints[3][1]
            ) {
              return;
            }
          }
          listener.remove();
          this.scanFallbackModalService.codeFound.set(firstBarcode.rawValue);
          this.closeModal();
        });
      },
    );
    await BarcodeScanner.startScan(options);
  }

  private async stopScan(): Promise<void> {
    document.querySelector('body')?.classList.remove('barcode-scanner-active');

    await BarcodeScanner.stopScan();
  }
}
