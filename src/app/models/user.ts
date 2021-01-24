import {Role} from './role';

export class User {
  id: number;
  username: string;
  password: string;
  registrationDate: string;
  avatar: string;
  email: string;
  role: Role;
  token?: string;
}
