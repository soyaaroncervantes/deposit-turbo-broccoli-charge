import * as fromUI from './shared/ui.actions';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  ui: fromUI.State;
}

export const AppReducer: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer
};
