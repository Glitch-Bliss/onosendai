import { ElementType } from "../../../core/enums/element-type.enum";

export interface QrItem {
  uid: string;
  name: string;
  type: ElementType;
}

export class QrItemModel implements QrItem {
  constructor(
    public uid: string,
    public name: string,
    public type: ElementType
  ) {}

  toJson(): string {
    return JSON.stringify(this);
  }
}
