import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ElementType } from '../../../../core/enums/element-type.enum';
import { v4 as uuidv4 } from 'uuid';
import { QrCodesService } from '../../services/qr-codes.service';
import { QrItem, QrItemModel } from '../../models/qr-item.model';
import { QR_TYPE_REGISTRY } from '../../../../core/registries/qr-type.registry';
import { QrCodesPdfService } from '../../services/qr-codes-pdf.service';
import { nanoid } from 'nanoid';
import { ButtonComponent } from "../../../../shared/components/button-component/button-component";
import { ProgressService } from '../../../../core/services/progression.service';

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

  ElementType = ElementType;
  codesGenerated: WritableSignal<QrCodeView[]> = signal([]);
  elementsNumber = Array.from({ length: 10 });

  private generator = inject(QrCodesService);
  private pdf = inject(QrCodesPdfService);

  async generateAndDownload(type: ElementType, quantity: number = 10) {
    const qrs: QrItem[] = this.generateQrCodesModels(type, quantity);
    const images: string[] = await this.generator.generateQrCodesDataURIBatch(qrs);
    const types: ElementType[] = qrs.map(q => q.type);

    await this.pdf.export(images, types);
  }

  private generateQrCodesModels(type: ElementType, quantity: number = 10) {
    return Array.from({ length: quantity }, (_, i) => ({
      uid: nanoid(10),
      userid: nanoid(12),
      type: type
    }));
  }
}

