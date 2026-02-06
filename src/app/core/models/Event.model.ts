import { EventType } from "../enums/enum-type.enum";
import { Condition } from "./Condition.model";
import { EventConsequence } from "./Event-consequence.model";

export interface Event {
  id: string;
  conditions: Condition[];
  type: EventType;
  consequences: EventConsequence[];
}