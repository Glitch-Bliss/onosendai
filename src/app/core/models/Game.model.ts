import { Crew } from "./Crew.model";
import { Scenario } from "./Scenario.model";
import { User } from "./User.model";
import { Player } from "./Player.model";

export interface Game {
    id:string,
    name:string,
    date_played:string,
    date_created:string,
    owner:User,
    players:Player[],
    scenario:Scenario,
    crews:Crew[]
}