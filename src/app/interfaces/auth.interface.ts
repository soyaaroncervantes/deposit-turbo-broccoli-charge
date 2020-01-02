import {UserAuthBaseInterface} from './user-auth-base.interface';

export interface AuthInterface extends UserAuthBaseInterface {
  password: string;
}
