import * as fromAuth from './auth.actions';
import {UserModel} from '../model/user.model';

export interface AuthState {
  user: UserModel;
}

export const initState: AuthState = {
  user: null
};

export function authReducer( state = initState, action: fromAuth.actions ): AuthState {

  switch ( action.type ) {

    case fromAuth.SET_USER:
      return {
        user: {...action.userModel}
      };

    default:
      return state;
  }

}

