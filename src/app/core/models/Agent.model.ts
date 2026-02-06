import { StateAgent } from "../enums/state-agent.enum";
import { Action } from "./Action.model";
import { AgentProfile } from "./Agent-profile.model";
import { Item } from "./Item.model";
import { Wound } from "./Wound.model";

export interface Agent {
    id: string;
    name: string;
    description: string;
    imageUrl: URL;
    actions: Action[];
    items: Item[];
    state: StateAgent;
    profile: AgentProfile;
    wounds: Wound[];

}