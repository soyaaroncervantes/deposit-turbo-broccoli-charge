import {UserAuthBaseInterface} from './user-auth-base.interface';

export interface UserInterface extends UserAuthBaseInterface {
  uid: string;
}
