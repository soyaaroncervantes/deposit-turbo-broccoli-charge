import {Action} from '@ngrx/store';

export const ACTIVAR_LOADING = '[ UI LOADING ] Cargando...';
export const DESACTIVAR_LOADING = '[ UI LOADING ] Fin de carga.';

export class ActivarLoadingAction implements Action {
  readonly type: string = ACTIVAR_LOADING;
}

export class DesactivarLoadingAction implements Action {
  readonly type: string = DESACTIVAR_LOADING;
}

export type acciones = ActivarLoadingAction | DesactivarLoadingAction;
