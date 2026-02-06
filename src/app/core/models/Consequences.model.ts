import { EventConsequenceType } from "../enums/event-consequence-type.enum";

export interface BaseEventConsequence {
  id: string;
  kind: EventConsequenceType;
}

export interface NewItemConsequence extends BaseEventConsequence {
  kind: EventConsequenceType.NEW_ITEM;
  itemId: string;
}

export interface DamageConsequence extends BaseEventConsequence {
  kind: EventConsequenceType.DAMAGE;
  amount: number;
}

export interface ScenarioConsequence extends BaseEventConsequence {
  kind: EventConsequenceType.SCENARIO;
  scenarioId: string;
}

export interface NewStateConsequence extends BaseEventConsequence {
  kind: EventConsequenceType.NEW_STATE;
  state: string;
}

export interface EsotericConsequence extends BaseEventConsequence {
  kind: EventConsequenceType.ESOTERIC;
  effect: string;
}

export interface NewFoeConsequence extends BaseEventConsequence {
  kind: EventConsequenceType.NEW_FOE;
  foeId: string;
}

export interface NewFriendConsequence extends BaseEventConsequence {
  kind: EventConsequenceType.NEW_FRIEND;
  friendId: string;
}

export interface ProfileConsequence extends BaseEventConsequence {
  kind: EventConsequenceType.PROFILE;
  profileDelta: Record<string, number>;
}
