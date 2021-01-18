import {Role} from './role';

export class User {
  id: number;
  username: string;
  password: string;
  registration_date: Date;
  role: Role;
  token?: string;
}
