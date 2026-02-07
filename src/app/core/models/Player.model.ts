import { Crew } from "./Crew.model"
import { User } from "./User.model"

export interface Player {
    id:string,
    user:User,
    crew:Crew;
    isactive?:boolean;
}