import { Component, inject, input } from '@angular/core';
import { ProgressService } from '../../services/progression.service';

@Component({
  selector: 'app-progressbar-component',
  imports: [],
  templateUrl: './progressbar-component.html',
  styleUrl: './progressbar-component.scss',
   host: {
   role: 'progressbar',
   'aria-valuemin': '0',
   'aria-valuemax': '100',
   '[attr.aria-valuenow]': 'progressService.progress()',
 }
})
export class ProgressbarComponent {
  progressService = inject(ProgressService);
}
