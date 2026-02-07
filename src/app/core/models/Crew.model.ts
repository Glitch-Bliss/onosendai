import { Agent } from "./Agent.model";
import { CrewProfile } from "./Crew-profile.model";
import { Item } from "./Item.model";
import { LogEvent } from "./Log-event.model";

export interface Crew {
    id: string,
    name: string,
    description: string,
    imageUrl:string,
    profile:CrewProfile,
    agents:Agent[],
    date_last_edition:string,
    dateCreated:string,
    log:LogEvent[],
    stash:Item[]
}