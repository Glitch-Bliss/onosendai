import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { QrcodeDemo } from "../components/demo/demo";

@Component({
    standalone: true,
    selector: 'app-scanners-demo-page',
    imports: [
    CommonModule,
    QrcodeDemo
],
    template: `
    <h1>@for (c of title; track $index) { <span>{{ c }}</span> }</h1>
    <app-scanners-demo/>
  `,
})
export class DemoPage {
    title = 'SCANNERS';
}