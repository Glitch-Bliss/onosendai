import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ElementType } from '../../../../core/enums/element-type.enum';
import { QrCodesService } from '../../services/qr-codes.service';
import { QR_TYPE_REGISTRY } from '../../../../core/registries/qr-type.registry';
import { QrCodesPdfService } from '../../services/qr-codes-pdf.service';
import { nanoid } from 'nanoid';
import { ButtonComponent } from "../../../../shared/components/button-component/button-component";
import { NotificationService } from '../../../../core/services/notification.service';

// qr-preview.component.ts
type QrCodeView = {
  image: string;
  qrCodeData: string;
};

@Component({
  standalone: true,
  selector: 'app-qr-code-generator',
  imports: [ButtonComponent],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.scss',
})
export class QrCodeGeneratorComponent {

  notificationService = inject(NotificationService);

  ElementType = ElementType;
  codesGenerated: WritableSignal<QrCodeView[]> = signal([]);
  elementsNumber = Array.from({ length: 10 });
  typesButton = [ElementType.BUILDING, ElementType.NPC, ElementType.OBJECT, ElementType.SCATTER, ElementType.VEHICLE];

  private generator = inject(QrCodesService);
  private pdf = inject(QrCodesPdfService);

  async generateAndDownload(type: ElementType, quantity: number = 10) {
    const generatedModels = this.generateQrCodesModels(type, quantity);
    const qrCodesImages = await this.generator.generateQrCodesDataUriByWorker(generatedModels);
    this.pdf.export(qrCodesImages, type);
  }

  private generateQrCodesModels(type: ElementType, quantity: number = 10): string[] {
    return Array.from({ length: quantity }, (_, i) => (
      `${nanoid(12)}|${nanoid(10)}|${QR_TYPE_REGISTRY[type].qrcodeIndex}`
    ));
  }
}

