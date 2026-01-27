import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { QrCodeGenerator } from "../../components/qr-code-generator/qr-code-generator";

@Component({
    standalone: true,
    selector: 'app-qr-page',
    imports: [
        CommonModule,
        QrCodeGenerator
    ],
    template: `
    <h1>@for (c of title; track $index) { <span>{{ c }}</span> }</h1>
    <app-qr-code-generator/>
  `,
})
export class QrCodeGeneratorPage {
    title = 'GENERATE';
}
