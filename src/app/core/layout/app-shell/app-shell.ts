import { Component, inject } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { MainMenu as MainMenuComponent } from '../main-menu/main-menu';
import { Footer } from "../footer/footer";
import { ScanFallbackModal } from "../../scan-fallback-modal/scan-fallback-modal";
import { ScanService } from '../../services/scan.service';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [MainMenuComponent, RouterOutlet, Footer, ScanFallbackModal],
  templateUrl: './app-shell.html'
})
export class AppShellComponent {

  scanFallbackModalService = inject(ScanService);

}