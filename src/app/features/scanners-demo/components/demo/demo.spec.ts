import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeDemo } from './qrcode-demo';

describe('QrcodeDemo', () => {
  let component: QrcodeDemo;
  let fixture: ComponentFixture<QrcodeDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrcodeDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrcodeDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
