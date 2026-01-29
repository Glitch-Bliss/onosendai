import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrCodeGenerator } from './generator';

describe('QrCodeGenerator', () => {
  let component: QrCodeGenerator;
  let fixture: ComponentFixture<QrCodeGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrCodeGenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrCodeGenerator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
