import {Action} from '@ngrx/store';
import {UserModel} from '../model/user.model';

export const SET_USER = '[AUTH] Set user';

export class SetUserAction implements Action {
  readonly type = SET_USER;

  constructor( public userModel: UserModel) { }
}

export type actions = SetUserAction;
