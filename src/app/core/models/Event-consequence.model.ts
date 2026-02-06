import { DamageConsequence, EsotericConsequence, NewFoeConsequence, NewFriendConsequence, NewItemConsequence, NewStateConsequence, ProfileConsequence, ScenarioConsequence } from "./Consequences.model";

export type EventConsequence =
  | NewItemConsequence
  | DamageConsequence
  | ScenarioConsequence
  | NewStateConsequence
  | EsotericConsequence
  | NewFoeConsequence
  | NewFriendConsequence
  | ProfileConsequence;
