import {Role} from './role';

export class User {
  id: number;
  username: string;
  password: string;
  registrationDate: string;
  role: Role;
  token?: string;
}
