import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

import {Store} from '@ngrx/store';

import Swal from 'sweetalert2';

import {map} from 'rxjs/operators';

import {UserModel} from '../model/user.model';
import {ActivarLoadingAction, DesactivarLoadingAction} from '../shared/ui.actions';

import {AuthInterface} from '../interfaces/auth.interface';
import {AppState} from '../app.reducer';
import {UserInterface} from '../interfaces/user.interface';
import {SetUserAction} from './auth.actions';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subscription: Subscription;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.subscription = new Subscription();
  }

  initAuthListener() {

    this.angularFireAuth.authState.subscribe( (user: firebase.User ) => {

      if ( user ) {

        this.subscription = this.angularFirestore
          .doc<UserInterface>(`${ user.uid }/user`)
          .valueChanges()
          .subscribe( (value: UserInterface) => {

            console.log('%c [ USER - Service ] value', 'color: aqua', value );

            const user = new UserModel( value );

            this.store.dispatch( new SetUserAction( user ) );

          });

      } else {

        this.subscription.unsubscribe();

      }

    });

  }

  isAuth() {

    return this.angularFireAuth.authState

      .pipe(

        map( value => {

          if ( value === null ) { this.router.navigate(['login']); }

          return value !== null;

        })

      );

  }

  createUser( user: AuthInterface ) {

    this.store.dispatch( new ActivarLoadingAction() );

    this.angularFireAuth.auth
      .createUserWithEmailAndPassword( user.email, user.password )
      .then( value => {


        // console.log('%c [ REGISTER - Service ] value', 'color: lightcoral', value );

        const userModel: UserModel = {
          uid: value.user.uid,
          email: value.user.email,
          name: user.name
        };

        this.angularFirestore
          .doc(`${ userModel.uid }/user`)
          .set( userModel )
          .then( () => {
            this.router.navigate(['/dashboard']).then();
            this.store.dispatch( new DesactivarLoadingAction() );
          });

      })

      .catch( reason => {

        console.warn('[ REGISTER - Service ] Error : ', reason);

        Swal.fire({
          title: 'Error en el registro',
          icon: 'error',
          text: reason.message
        });

        this.store.dispatch( new DesactivarLoadingAction() );

      });

  }

  loginUser( user: AuthInterface ) {

    this.store.dispatch( new ActivarLoadingAction() );

    this.angularFireAuth.auth.signInWithEmailAndPassword( user.email, user.password )
      .then( value => {

        // console.log('%c [ LOGIN - Service ] value', 'color: lightsalmon', value );

        this.router.navigate(['/dashboard']).then();

        this.store.dispatch( new DesactivarLoadingAction() );

      })

      .catch( reason => {

        // console.warn('[ LOGIN - Service ] Error: ', reason);

        this.store.dispatch( new DesactivarLoadingAction() );

        Swal.fire({
          title: 'Error en el login',
          icon: 'error',
          text: reason.message
        });

      });

  }

  logout() {
    this.angularFireAuth.auth.signOut()
      .then( value => {

        // console.log('%c [ LOGOUT - Service ] value', 'color: lightgrey' );

        this.router.navigate(['/login']).then();

      })
      .catch(reason => {

        // console.warn('[ LOGOUT - Service ] Error: ', reason);

        Swal.fire({
          title: 'Error al querer cerrar su sesión',
          icon: 'error',
          text: reason.message
        });

      });

  }

}
