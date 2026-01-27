import { Component, signal, WritableSignal } from '@angular/core';
import { ElementType } from '../../../core/enums/element-type.enum';
import { QrItemModel } from '../../qr/models/qr-item.model';
import { v4 as uuidv4 } from 'uuid';
import { QrFacade } from '../../qr/services/qr.facade';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  standalone: true,
  selector: 'app-qr-code-generator',
  imports: [QRCodeComponent],
  templateUrl: './qr-code-generator.html',
  styleUrl: './qr-code-generator.scss',
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


