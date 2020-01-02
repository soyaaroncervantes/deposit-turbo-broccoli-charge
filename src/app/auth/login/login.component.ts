import { Component, OnInit } from '@angular/core';
import {AuthInterface} from '../../interfaces/auth.interface';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() { }

  onSubmit( user: AuthInterface ) {

    // console.log('%c [ LOGIN - Component ] value', 'color: lightgreen', user );
    this.authService.loginUser( user );

  }

}
