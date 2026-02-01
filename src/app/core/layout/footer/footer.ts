import { Component } from '@angular/core';
import { NotificationsComponent } from "../notifications-component/notifications-component";

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [NotificationsComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {

}
