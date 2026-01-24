import { TestBed } from '@angular/core/testing';

import { QrcodeScannerService } from './qrcode-scanner.service';

describe('QrcodeScannerService', () => {
  let service: QrcodeScannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrcodeScannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
