import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { QrcodeDemo } from "../../components/qrcode-demo/qrcode-demo";

@Component({
    standalone: true,
    selector: 'app-qr-page',
    imports: [
    CommonModule,
    QrcodeDemo
],
    template: `
    <h1>@for (c of title; track $index) { <span>{{ c }}</span> }</h1>
    <app-qrcode-demo/>
  `,
})
export class DemoPage {
    title = 'SCANNERS';
}