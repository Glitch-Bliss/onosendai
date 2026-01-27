import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QrcodeDemo } from "./shared/components/qrcode-demo/qrcode-demo";
import {Tab, Tabs, TabList, TabPanel, TabContent} from '@angular/aria/tabs';
import { QrCodeGenerator } from "./shared/components/qr-code-generator/qr-code-generator";

@Component({
  selector: 'app-root',
  imports: [QrcodeDemo, TabList, Tab, Tabs, TabPanel, TabContent, QrCodeGenerator],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('onosendai');
}
