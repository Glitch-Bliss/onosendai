import { Component, input, output } from '@angular/core';

@Component({
  standalone:true,
  selector: 'app-button-component',
  imports: [],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
})
export class ButtonComponent {
  clicked = output<void>();
  buttonText = input<string>();
}
