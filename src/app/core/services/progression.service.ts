import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProgressService {  
  readonly progress: WritableSignal<number> = signal(0);
  readonly generating: WritableSignal<boolean> = signal(false);
  readonly currentLabel: WritableSignal<string> = signal("");

  start(currentLabel:string = "") {
    this.currentLabel.set(currentLabel);
    this.generating.set(true);
    this.progress.set(0);
  }
  
  set(value: number) {
    this.progress.set(Math.min(Math.max(value, 0), 100));
  }

  complete() {
    this.progress.set(100);
    this.generating.set(false);
    this.currentLabel.set("");
  }
}
