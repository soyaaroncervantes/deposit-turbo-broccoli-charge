import { Injectable } from '@angular/core';
import {AuthInterface} from '../interfaces/auth.interface';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {map} from 'rxjs/operators';
import {UserModel} from '../model/user.model';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router,
  ) { }

  initAuthListener() {

    this.angularFireAuth.authState.subscribe( (value: firebase.User ) => {
      console.log('%c [ USER - Service ] value', 'color: aqua', value );
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
          .then( () => this.router.navigate(['/dashboard']) );

      })

      .catch( reason => {

        // console.warn('[ REGISTER - Service ] Error : ', reason);

        Swal.fire({
          title: 'Error en el registro',
          icon: 'error',
          text: reason.message
        });

      });

  }

  loginUser( user: AuthInterface ) {

    this.angularFireAuth.auth.signInWithEmailAndPassword( user.email, user.password )
      .then( value => {

        // console.log('%c [ LOGIN - Service ] value', 'color: lightsalmon', value );

        this.router.navigate(['/dashboard']).then();

      })

      .catch( reason => {

        // console.warn('[ LOGIN - Service ] Error: ', reason);

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
