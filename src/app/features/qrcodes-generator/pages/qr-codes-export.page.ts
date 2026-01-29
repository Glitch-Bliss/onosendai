import { Component, inject } from "@angular/core";
import { QrCodesService } from "../services/qr-codes.service";
import { QrCodesPdfService } from "../services/qr-codes-pdf.service";
import { QrCodeGeneratorComponent } from "../components/generator/generator.component";

@Component({
  standalone: true,
  template: `
    <app-qr-code-generator>
  `,
  imports: [QrCodeGeneratorComponent],
})
export class QrCodesExportPage {

}
