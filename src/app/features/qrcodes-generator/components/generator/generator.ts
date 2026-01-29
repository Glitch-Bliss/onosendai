import { Component, signal, WritableSignal } from '@angular/core';
import { ElementType } from '../../../../core/enums/element-type.enum';
import { v4 as uuidv4 } from 'uuid';
import { QRCodeComponent } from 'angularx-qrcode';
import { QrFacade } from '../../services/qr.facade';
import { QrItemModel } from '../../models/qr-item.model';

@Component({
  standalone: true,
  selector: 'app-qr-code-generator',
  imports: [QRCodeComponent],
  templateUrl: './generator.html',
  styleUrl: './generator.scss',
})
export class QrCodeGenerator {

  ElementType = ElementType;
  codesGenerated: WritableSignal<string[]> = signal([]);
  elementsNumber = Array.from({ length: 10 });

  generateCode(type: ElementType, quantity: number = 10) {
    this.codesGenerated = signal([]);
    for (let i = 0; i < quantity; i++) {
      const qrString: string = QrFacade.generateQrCodeCode(new QrItemModel(uuidv4(), "", type));
      this.codesGenerated.update(codesArr => {
        codesArr.push(qrString);
        return codesArr;
      });
    }
  }

}


