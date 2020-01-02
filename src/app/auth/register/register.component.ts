import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {AuthInterface} from '../../interfaces/auth.interface';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    public store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('ui')
      .subscribe( value => this.cargando = value.isLoading );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit( value: AuthInterface ) {
    // console.log('%c [ REGISTER - Component ] value', 'color: lightblue', value );
    this.authService.createUser( value );
  }
}
