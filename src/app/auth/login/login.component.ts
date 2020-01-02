import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthInterface} from '../../interfaces/auth.interface';
import {AuthService} from '../auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    public store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('ui')
      .subscribe(value => this.cargando = value.isLoading );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit( user: AuthInterface ) {

    // console.log('%c [ LOGIN - Component ] value', 'color: lightgreen', user );
    this.authService.loginUser( user );

  }

}
