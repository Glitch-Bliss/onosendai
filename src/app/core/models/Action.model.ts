import { ActionType } from "../enums/action-type.enum";

export interface Action {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  type: ActionType;
}