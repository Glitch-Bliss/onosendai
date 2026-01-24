import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QrcodeDemo } from "./qrcode-demo/qrcode-demo";

@Component({
  selector: 'app-root',
  imports: [QrcodeDemo],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('onosendai');
}
