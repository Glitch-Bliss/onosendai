import { Injectable, signal, WritableSignal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ScanService {
    scanModalShown: WritableSignal<boolean> = signal<boolean>(false);
    codeFound: WritableSignal<string | undefined> = signal<string | undefined>("");
}