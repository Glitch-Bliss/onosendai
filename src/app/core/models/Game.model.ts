import { Crew } from "./Crew.model";
import { Scenario } from "./Scenario.model";
import { User } from "./User.model";
import { Player } from "./Player.model";
import { LogEvent } from "./Log-event.model";

export interface Game {
    id:string,
    name:string,
    date_played:string,
    date_created:string,
    owner:User,
    players:Player[],
    scenario:Scenario,
    gamelog:LogEvent[]
}