import { Component, inject } from "@angular/core";
import { QrCodesFacade } from "../services/qr-codes.facade";
import { QrCodesPdfService } from "../services/qr-codes-pdf.service";
import { QrCodeGenerator } from "../components/generator/generator";

@Component({
  standalone: true,
  template: `
    <app-qr-code-generator>
  `,
  imports: [QrCodeGenerator],
})
export class QrCodesExportPage {

}
