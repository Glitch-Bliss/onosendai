import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";

@Component({
    standalone: true,
    selector: 'app-qr-page',
    imports: [
        CommonModule
    ],
    template: `
    <h1>@for (c of title; track $index) { <span>{{ c }}</span> }</h1>
  `,
})
export class HomePage {
    title = 'HOME';
}
