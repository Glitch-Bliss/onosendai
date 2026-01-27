import { Component, signal } from '@angular/core';
import { Tab, Tabs, TabList, TabPanel, TabContent } from '@angular/aria/tabs';
import { QrCodeGenerator } from "./features/components/qr-code-generator/qr-code-generator";
import { AppShellComponent } from "./core/layout/app-shell/app-shell";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [AppShellComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('onosendai');
}