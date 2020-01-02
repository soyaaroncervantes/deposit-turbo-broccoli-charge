import {UserInterface} from '../interfaces/user.interface';

export class UserModel implements UserInterface {

  email: string;
  name: string;
  uid: string;

  constructor( user: UserInterface ) {
    this.email = user && user.email || null;
    this.name = user && user.name || null;
    this.uid = user && user.uid || null;
  }


}
