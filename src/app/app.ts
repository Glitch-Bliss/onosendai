import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QrcodeDemo } from "./qrcode-demo/qrcode-demo";
import {Tab, Tabs, TabList, TabPanel, TabContent} from '@angular/aria/tabs';

@Component({
  selector: 'app-root',
  imports: [QrcodeDemo, TabList, Tab, Tabs, TabPanel, TabContent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('onosendai');
}
