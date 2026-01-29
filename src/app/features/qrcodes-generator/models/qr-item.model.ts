import { ElementType } from "../../../core/enums/element-type.enum";

export interface QrItem {
  uid: string;
  userid: string;
  type: ElementType;
}

export class QrItemModel implements QrItem {
  constructor(
    public uid: string,
    public userid: string,
    public type: ElementType
  ) {}

  toJson(): string {
    return JSON.stringify(this);
  }
}
