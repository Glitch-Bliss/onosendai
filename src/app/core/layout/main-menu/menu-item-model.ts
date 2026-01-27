import { UserRole } from "../../enums/user-role.enum";


export interface MenuItem {
  id: string;
  label: string;
  route?: string;
  icon?: string;
  children?: MenuItem[];
  roles?: UserRole[]; 
  hidden?: boolean;
}
