import {UserInterface} from '../interfaces/user.interface';

export class UserModel implements UserInterface {

  email: string;
  name: string;
  uid: string;

  constructor(
    email: string,
    name: string,
    uid: string
  ) {
    this.email = email;
    this.name = name;
    this.uid = uid;
  }


}
