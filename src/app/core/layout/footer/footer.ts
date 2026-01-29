import { Component } from '@angular/core';
import { ProgressbarComponent } from "../progressbar-component/progressbar-component";

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [ProgressbarComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {

}
